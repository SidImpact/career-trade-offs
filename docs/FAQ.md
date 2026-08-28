# ❓ Frequently Asked Questions (FAQ)

### Where does the salary and market data come from?
The baseline data for our static careers (salaries, job growth) is aggregated from standard labor statistics (like the BLS), industry reports, and market benchmarks. However, it is intended to represent *general patterns* and should not be used as certified financial advice.

### How does the "Generate AI" feature work?
When you search for a career not in our database, you can click "Generate AI". This sends a request to the **Google Gemini API**, prompting it to act as an expert labor market analyst. It evaluates the career and returns a structured, realistic profile of the trade-offs, which is then saved locally to your browser.

### Why do some custom AI careers disappear when I switch computers?
Careers generated via the AI tool are saved in your browser's `localStorage` to keep the application fast and privacy-focused without requiring a user database. This means they are tied to the specific browser and device you generated them on.

### Is the AI Risk metric accurate?
The AI Risk metric (ranging from Low to Very High) is a forward-looking estimate based on current advancements in LLMs and automation robotics. Roles heavily reliant on digital text processing typically score higher risk, while physical, empathetic, or highly regulated roles score lower.

### My "Generate AI" button is disabled or failing. Why?
There are a few reasons this might happen:
1. You may have hit the rate limit (maximum 1 request per 30 seconds per IP address) to prevent spam.
2. The career name you entered is too long (limit is 80 characters).
3. The platform's Gemini API quota may be temporarily exhausted. 

### Does this site track my quiz answers?
No. Your quiz answers are processed entirely on your device (client-side) to generate your matches. We do not store your personal career preferences in a database.
