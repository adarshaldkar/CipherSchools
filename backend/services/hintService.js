const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getHint = async (assignmentTitle, assignmentDescription, userQuery) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = [
      'You are a helpful SQL tutor. A student is working on a SQL assignment and needs a hint.',
      'Do NOT give the full answer. Give a short, helpful hint (1-3 sentences) that guides them in the right direction.',
      '',
      `Assignment: ${assignmentTitle}`,
      `Description: ${assignmentDescription}`,
      `Student's current query: ${userQuery || '(empty — they have not started yet)'}`,
      '',
      'Give a concise hint:',
    ].join('\n');

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (text && text.trim().length > 0) {
      return text.trim();
    }

    return getFallbackHint(assignmentTitle, assignmentDescription, userQuery);
  } catch (err) {
    console.error('Gemini API error, using fallback hints:', err.message);
    return getFallbackHint(assignmentTitle, assignmentDescription, userQuery);
  }
};

const getFallbackHint = (assignmentTitle, assignmentDescription, userQuery) => {
  const desc = (assignmentDescription || '').toLowerCase();
  const query = (userQuery || '').toLowerCase();
  const combined = `${desc} ${assignmentTitle}`.toLowerCase();

  if (combined.includes('join') && !query.includes('join')) {
    return 'Think about using JOIN to combine data from multiple tables.';
  }

  if (combined.includes('count') || combined.includes('how many')) {
    if (!query.includes('count')) {
      return 'Consider using COUNT() aggregate function.';
    }
    if (!query.includes('group by')) {
      return 'Consider using GROUP BY to group your results before counting.';
    }
  }

  if (combined.includes('group') && !query.includes('group by')) {
    return 'Consider using GROUP BY to organize your results into groups.';
  }

  if (combined.includes('not enrolled') || combined.includes('not in') || combined.includes('no ')) {
    if (!query.includes('left join') && !query.includes('not in') && !query.includes('not exists')) {
      return 'Think about using LEFT JOIN with IS NULL, NOT IN, or NOT EXISTS to find missing records.';
    }
  }

  if (combined.includes('most') || combined.includes('highest') || combined.includes('max')) {
    if (!query.includes('order by') && !query.includes('max')) {
      return 'Try using ORDER BY with LIMIT, or MAX() to find the top result.';
    }
  }

  if (combined.includes('filter') || combined.includes('specific') || combined.includes('where')) {
    if (!query.includes('where')) {
      return 'Try using a WHERE clause to filter your results.';
    }
  }

  if (!query.includes('select')) {
    return 'Start your query with SELECT to retrieve data.';
  }

  return 'Review the assignment description carefully and think about which SQL clauses match the requirements.';
};

module.exports = { getHint };
