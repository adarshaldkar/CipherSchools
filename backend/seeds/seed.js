require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const { Pool } = require('pg');
const Assignment = require('../models/Assignment');

const pool = new Pool({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

const assignments = [
  {
    title: 'Find All Students',
    description: 'Write a query to retrieve all students from the students table. Return all columns.',
    difficulty: 'Easy',
    sampleData: {
      tableName: 'students',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'VARCHAR' },
        { name: 'email', type: 'VARCHAR' },
        { name: 'age', type: 'INTEGER' },
      ],
      rows: [
        [1, 'Alice Johnson', 'alice@example.com', 22],
        [2, 'Bob Smith', 'bob@example.com', 24],
        [3, 'Charlie Brown', 'charlie@example.com', 21],
        [4, 'Diana Ross', 'diana@example.com', 23],
        [5, 'Eve Davis', 'eve@example.com', 25],
      ],
    },
    expectedConcept: 'SELECT',
  },
  {
    title: 'Find Students Enrolled in a Specific Course',
    description:
      'Write a query to find the names of all students enrolled in the "Database Systems" course. You will need to join multiple tables.',
    difficulty: 'Medium',
    sampleData: {
      tableName: 'enrollments',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'student_id', type: 'INTEGER' },
        { name: 'course_id', type: 'INTEGER' },
      ],
      rows: [
        [1, 1, 1],
        [2, 1, 2],
        [3, 2, 1],
        [4, 3, 3],
        [5, 4, 2],
        [6, 5, 1],
        [7, 5, 3],
      ],
    },
    expectedConcept: 'JOIN WHERE filter specific course',
  },
  {
    title: 'Count Students Per Course',
    description:
      'Write a query to count how many students are enrolled in each course. Return the course name and student count.',
    difficulty: 'Medium',
    sampleData: {
      tableName: 'courses',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'VARCHAR' },
        { name: 'instructor', type: 'VARCHAR' },
      ],
      rows: [
        [1, 'Database Systems', 'Dr. Smith'],
        [2, 'Web Development', 'Prof. Jones'],
        [3, 'Algorithms', 'Dr. Lee'],
      ],
    },
    expectedConcept: 'JOIN COUNT GROUP BY',
  },
  {
    title: 'Find Students Not Enrolled in Any Course',
    description:
      'Write a query to find students who are not enrolled in any course. Return their names and emails.',
    difficulty: 'Hard',
    sampleData: {
      tableName: 'students',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'VARCHAR' },
        { name: 'email', type: 'VARCHAR' },
        { name: 'age', type: 'INTEGER' },
      ],
      rows: [
        [1, 'Alice Johnson', 'alice@example.com', 22],
        [2, 'Bob Smith', 'bob@example.com', 24],
        [3, 'Charlie Brown', 'charlie@example.com', 21],
        [4, 'Diana Ross', 'diana@example.com', 23],
        [5, 'Eve Davis', 'eve@example.com', 25],
      ],
    },
    expectedConcept: 'LEFT JOIN IS NULL NOT IN NOT EXISTS not enrolled',
  },
  {
    title: 'Find the Course with the Most Enrollments',
    description:
      'Write a query to find the course that has the most enrolled students. Return the course name and the enrollment count.',
    difficulty: 'Hard',
    sampleData: {
      tableName: 'enrollments',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'student_id', type: 'INTEGER' },
        { name: 'course_id', type: 'INTEGER' },
      ],
      rows: [
        [1, 1, 1],
        [2, 1, 2],
        [3, 2, 1],
        [4, 3, 3],
        [5, 4, 2],
        [6, 5, 1],
        [7, 5, 3],
      ],
    },
    expectedConcept: 'JOIN COUNT GROUP BY ORDER BY LIMIT most highest',
  },
  {
    title: 'Find Students Older Than Average Age',
    description:
      'Write a query to find all students whose age is greater than the average age of all students.',
    difficulty: 'Medium',
    sampleData: {
      tableName: 'students',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'VARCHAR' },
        { name: 'email', type: 'VARCHAR' },
        { name: 'age', type: 'INTEGER' },
      ],
      rows: [
        [1, 'Alice Johnson', 'alice@example.com', 22],
        [2, 'Bob Smith', 'bob@example.com', 24],
        [3, 'Charlie Brown', 'charlie@example.com', 21],
        [4, 'Diana Ross', 'diana@example.com', 23],
        [5, 'Eve Davis', 'eve@example.com', 25],
      ],
    },
    expectedConcept: 'Subquery AVG WHERE filter',
  },
  {
    title: 'List All Students with Their Course Names',
    description:
      'Write a query to list every student along with the name of the course they are enrolled in. Return the student name and course name.',
    difficulty: 'Easy',
    sampleData: {
      tableName: 'enrollments',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'student_id', type: 'INTEGER' },
        { name: 'course_id', type: 'INTEGER' },
      ],
      rows: [
        [1, 1, 1],
        [2, 1, 2],
        [3, 2, 1],
        [4, 3, 3],
        [5, 4, 2],
        [6, 5, 1],
        [7, 5, 3],
      ],
    },
    expectedConcept: 'JOIN multiple tables student course names',
  },
  {
    title: 'Find Students Enrolled in More Than One Course',
    description:
      'Write a query to find students who are enrolled in more than one course. Return the student name and the number of courses they are enrolled in.',
    difficulty: 'Medium',
    sampleData: {
      tableName: 'students',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'VARCHAR' },
        { name: 'email', type: 'VARCHAR' },
        { name: 'age', type: 'INTEGER' },
      ],
      rows: [
        [1, 'Alice Johnson', 'alice@example.com', 22],
        [2, 'Bob Smith', 'bob@example.com', 24],
        [3, 'Charlie Brown', 'charlie@example.com', 21],
        [4, 'Diana Ross', 'diana@example.com', 23],
        [5, 'Eve Davis', 'eve@example.com', 25],
      ],
    },
    expectedConcept: 'JOIN GROUP BY HAVING COUNT more than',
  },
  {
    title: 'Find Courses with No Enrollments',
    description:
      'Write a query to find courses that have zero student enrollments. Return the course name and instructor.',
    difficulty: 'Medium',
    sampleData: {
      tableName: 'courses',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'VARCHAR' },
        { name: 'instructor', type: 'VARCHAR' },
      ],
      rows: [
        [1, 'Database Systems', 'Dr. Smith'],
        [2, 'Web Development', 'Prof. Jones'],
        [3, 'Algorithms', 'Dr. Lee'],
      ],
    },
    expectedConcept: 'LEFT JOIN IS NULL NOT IN no enrollments empty',
  },
  {
    title: 'Find the Youngest Student in Each Course',
    description:
      'Write a query to find the youngest student enrolled in each course. Return the course name, student name, and their age.',
    difficulty: 'Hard',
    sampleData: {
      tableName: 'students',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'VARCHAR' },
        { name: 'email', type: 'VARCHAR' },
        { name: 'age', type: 'INTEGER' },
      ],
      rows: [
        [1, 'Alice Johnson', 'alice@example.com', 22],
        [2, 'Bob Smith', 'bob@example.com', 24],
        [3, 'Charlie Brown', 'charlie@example.com', 21],
        [4, 'Diana Ross', 'diana@example.com', 23],
        [5, 'Eve Davis', 'eve@example.com', 25],
      ],
    },
    expectedConcept: 'JOIN MIN subquery GROUP BY youngest each',
  },
];

const seedPostgres = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS enrollments');
    await client.query('DROP TABLE IF EXISTS courses');
    await client.query('DROP TABLE IF EXISTS students');

    await client.query(`
      CREATE TABLE students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        age INTEGER NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE courses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        instructor VARCHAR(100) NOT NULL
      )
    `);

    await client.query(`
      CREATE TABLE enrollments (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES students(id),
        course_id INTEGER REFERENCES courses(id)
      )
    `);

    await client.query(`
      INSERT INTO students (id, name, email, age) VALUES
      (1, 'Alice Johnson', 'alice@example.com', 22),
      (2, 'Bob Smith', 'bob@example.com', 24),
      (3, 'Charlie Brown', 'charlie@example.com', 21),
      (4, 'Diana Ross', 'diana@example.com', 23),
      (5, 'Eve Davis', 'eve@example.com', 25)
    `);

    await client.query(`
      INSERT INTO courses (id, name, instructor) VALUES
      (1, 'Database Systems', 'Dr. Smith'),
      (2, 'Web Development', 'Prof. Jones'),
      (3, 'Algorithms', 'Dr. Lee')
    `);

    await client.query(`
      INSERT INTO enrollments (id, student_id, course_id) VALUES
      (1, 1, 1),
      (2, 1, 2),
      (3, 2, 1),
      (4, 3, 3),
      (5, 4, 2),
      (6, 5, 1),
      (7, 5, 3)
    `);

    await client.query("SELECT setval('students_id_seq', 5)");
    await client.query("SELECT setval('courses_id_seq', 3)");
    await client.query("SELECT setval('enrollments_id_seq', 7)");

    console.log('PostgreSQL tables seeded successfully');
  } finally {
    client.release();
  }
};

const seedMongo = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected for seeding');

  await Assignment.deleteMany({});
  console.log('Cleared existing assignments');

  await Assignment.insertMany(assignments);
  console.log(`Inserted ${assignments.length} assignments`);
};

const seed = async () => {
  try {
    await seedMongo();
    await seedPostgres();
    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.disconnect();
    await pool.end();
    process.exit(0);
  }
};

seed();
