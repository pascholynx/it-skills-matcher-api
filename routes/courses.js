const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Sample course data with popular learning platforms
const courseData = {
  'JavaScript': [
    {
      title: 'JavaScript - The Complete Guide 2024',
      url: 'https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced',
      platform: 'Udemy',
      description: 'Modern JavaScript from the beginning - all the way up to JS expert level!'
    },
    {
      title: 'freeCodeCamp JavaScript Course',
      url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
      platform: 'freeCodeCamp',
      description: 'Free interactive JavaScript course with certifications'
    },
    {
      title: 'JavaScript.info',
      url: 'https://javascript.info/',
      platform: 'JavaScript.info',
      description: 'Modern JavaScript Tutorial - from basics to advanced topics'
    }
  ],
  'Python': [
    {
      title: '100 Days of Code: Python Pro Bootcamp',
      url: 'https://www.udemy.com/course/100-days-of-code/',
      platform: 'Udemy',
      description: 'Master Python by building 100 projects in 100 days'
    },
    {
      title: 'Python for Everybody Specialization',
      url: 'https://www.coursera.org/specializations/python',
      platform: 'Coursera',
      description: 'Learn to Program and Analyze Data with Python'
    },
    {
      title: 'Real Python Tutorials',
      url: 'https://realpython.com/',
      platform: 'Real Python',
      description: 'Comprehensive Python tutorials and articles'
    }
  ],
  'React': [
    {
      title: 'React - The Complete Guide',
      url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
      platform: 'Udemy',
      description: 'Learn React from ground up, including Hooks, Redux, and more'
    },
    {
      title: 'React Documentation',
      url: 'https://react.dev/learn',
      platform: 'React Official',
      description: 'Official React documentation and tutorials'
    },
    {
      title: 'Epic React by Kent C. Dodds',
      url: 'https://epicreact.dev/',
      platform: 'Epic React',
      description: 'Advanced React training by industry expert'
    }
  ],
  'Node.js': [
    {
      title: 'Node.js - The Complete Guide',
      url: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
      platform: 'Udemy',
      description: 'Learn Node.js by building real projects'
    },
    {
      title: 'Node.js Documentation',
      url: 'https://nodejs.org/en/learn',
      platform: 'Node.js Official',
      description: 'Official Node.js learning resources and guides'
    },
    {
      title: 'Learn Node.js',
      url: 'https://nodejs.dev/learn',
      platform: 'Node.js Dev',
      description: 'Comprehensive Node.js introduction and tutorials'
    }
  ],
  'TypeScript': [
    {
      title: 'Understanding TypeScript',
      url: 'https://www.udemy.com/course/understanding-typescript/',
      platform: 'Udemy',
      description: 'Complete TypeScript course from basics to advanced'
    },
    {
      title: 'TypeScript Documentation',
      url: 'https://www.typescriptlang.org/docs/',
      platform: 'TypeScript Official',
      description: 'Official TypeScript documentation and handbook'
    },
    {
      title: 'TypeScript Deep Dive',
      url: 'https://basarat.gitbook.io/typescript/',
      platform: 'GitBook',
      description: 'Comprehensive free TypeScript book'
    }
  ],
  'Java': [
    {
      title: 'Java Programming Masterclass',
      url: 'https://www.udemy.com/course/java-the-complete-java-developer-course/',
      platform: 'Udemy',
      description: 'Learn Java from beginner to expert level'
    },
    {
      title: 'Java Tutorial for Beginners',
      url: 'https://www.programiz.com/java-programming',
      platform: 'Programiz',
      description: 'Free Java programming tutorial'
    },
    {
      title: 'Codecademy Java Course',
      url: 'https://www.codecademy.com/learn/learn-java',
      platform: 'Codecademy',
      description: 'Interactive Java learning platform'
    }
  ],
  'C++': [
    {
      title: 'Beginning C++ Programming',
      url: 'https://www.udemy.com/course/beginning-c-plus-plus-programming/',
      platform: 'Udemy',
      description: 'Comprehensive C++ course for beginners'
    },
    {
      title: 'Learn C++',
      url: 'https://www.learncpp.com/',
      platform: 'LearnCpp',
      description: 'Free, comprehensive C++ tutorial'
    },
    {
      title: 'C++ Reference',
      url: 'https://en.cppreference.com/w/',
      platform: 'CPP Reference',
      description: 'Complete C++ language reference'
    }
  ],
  'AWS': [
    {
      title: 'AWS Certified Solutions Architect',
      url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/',
      platform: 'Udemy',
      description: 'Complete AWS certification preparation'
    },
    {
      title: 'AWS Skill Builder',
      url: 'https://explore.skillbuilder.aws/',
      platform: 'AWS Official',
      description: 'Official AWS training and certification'
    },
    {
      title: 'AWS Documentation',
      url: 'https://docs.aws.amazon.com/',
      platform: 'AWS Official',
      description: 'Official AWS documentation and guides'
    }
  ],
  'Docker': [
    {
      title: 'Docker & Kubernetes: The Complete Guide',
      url: 'https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/',
      platform: 'Udemy',
      description: 'Master Docker and Kubernetes development'
    },
    {
      title: 'Docker Documentation',
      url: 'https://docs.docker.com/get-started/',
      platform: 'Docker Official',
      description: 'Official Docker getting started guide'
    },
    {
      title: 'Play with Docker',
      url: 'https://labs.play-with-docker.com/',
      platform: 'Docker Labs',
      description: 'Interactive Docker learning environment'
    }
  ],
  'Git': [
    {
      title: 'Git Complete: The definitive Guide',
      url: 'https://www.udemy.com/course/git-complete/',
      platform: 'Udemy',
      description: 'Learn Git by doing'
    },
    {
      title: 'Git Documentation',
      url: 'https://git-scm.com/doc',
      platform: 'Git Official',
      description: 'Official Git documentation and Pro Git book'
    },
    {
      title: 'Learn Git Branching',
      url: 'https://learngitbranching.js.org/',
      platform: 'Interactive Tutorial',
      description: 'Visual and interactive way to learn Git'
    }
  ]
};

router.get('/:skill', auth, (req, res) => {
  try {
    const { skill } = req.params;
    console.log('Requested skill:', skill); // Debug log
    
    const courses = courseData[skill] || [];
    console.log('Found courses:', courses); // Debug log
    
    res.json(courses);
  } catch (error) {
    console.error('Error in courses route:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 