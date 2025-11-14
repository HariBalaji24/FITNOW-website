import { db } from "../database/database.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const userdetails = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await db.query(
      "SELECT * FROM personalinfo WHERE user_id=$1",
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User details not found" });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Error fetching user details" });
  }
};

const workoutrecommend = async (req, res) => {
  try {
    const { user_id, age, height, weight, gender } = req.body;

    const existing = await db.query(
      "SELECT * FROM workouts WHERE user_id=$1",
      [user_id]
    );
    if (existing.rows.length > 0) {
      return res.json({
        success: true,
        message: "Workout plan already exists",
        plan: existing.rows,
      });
    }

    const prompt = `
You are a certified personal trainer. Create a structured 30-day gym workout plan for a ${age}-year-old ${gender}, ${height} cm tall and ${weight} kg, focused on balanced fitness and muscle development.

### Requirements:
- 5 focused workout days per week (Upper Push, Upper Pull, Lower Strength, Core Stability, Full Body)
- 1 active recovery day + 1 full rest day per week
- No repeated workouts on consecutive days
- Focus names MUST be exactly 2–3 words (e.g., “Upper Push”, “Lower Strength”)
- Every exercise MUST include:
  • numeric sets and reps ONLY (e.g., 3x10)  
  • a 1–2 line description (clear technique + purpose)  
  • estimated calories burned (e.g., ~50 kcal)  
  • targeted muscle group (e.g., “Chest, Shoulders, Triceps”)
- Do NOT use:
  “per leg”, “AMRAP”, “failure”, “optional”, “to fatigue”, or any non-numeric reps
- Keep descriptions short, professional, and helpful
- No intro, no outro, no explanations outside the table

### Output Format (strict):
Return ONLY a clean Markdown table:

| Day | Focus | Key Exercises (sets x reps, description, calories, muscle group) |

### Example Format (structure only, DO NOT copy exercises):
| Day | Focus | Key Exercises (sets x reps, description, calories, muscle group) |
| 1 | Upper Push | Bench Press (3x10 — Controlled chest press improving pushing power and upper-body stability. ~55 kcal — Chest, Shoulders, Triceps), Overhead Press (3x10 — Vertical shoulder press developing deltoids and core stability. ~45 kcal — Shoulders, Triceps) |
| 2 | Upper Pull | Barbell Row (3x10 — Horizontal pulling movement building back thickness and posture strength. ~50 kcal — Lats, Rhomboids, Biceps), Lat Pulldown (3x12 — Vertical pull focusing on lat engagement and full range. ~45 kcal — Lats, Biceps) |


`;


    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent(prompt);
    const workoutPlan = result.response.text();

   
    function parseMarkdownTable(markdown) {
      const rows = markdown
        .split("\n")
        .filter((line) => line.includes("|") && !line.includes("---"));
      return rows.slice(1).map((row) => {
        const cells = row
          .split("|")
          .map((c) => c.trim())
          .filter(Boolean);
        return {
          day: cells[0],
          focus: cells[1],
          exercises: cells[2],
        };
      }).filter((r) => r.day && r.focus && r.exercises);
    }

    const parsed = parseMarkdownTable(workoutPlan);

    for (let i = 0; i < parsed.length; i++) {
      await db.query(
        "INSERT INTO workouts (user_id, day, focus, exercises) VALUES ($1, $2, $3, $4)",
        [user_id, parsed[i].day, parsed[i].focus, parsed[i].exercises]
      );
    }

    console.log(`Workout plan added for user ${user_id}`);

    res.json({
      success: true,
      message: "Workout plan added successfully",
      plan: parsed,
    });
  } catch (error) {
    console.error("Error generating workout plan:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate plan" });
  }
};

const getallworkouts = async (req,res) => {
  try {
    const {user_id} = req.params
    const result = await db.query("select * from workouts where user_id=$1 ORDER BY day::int ASC ",[user_id])
    return res.json(result.rows)
  } catch (error) {
    
  }
   
} 

export default { workoutrecommend, userdetails, getallworkouts };
