// Data Science Major Course Data & Relationships
const courseData = {
  nodes: [
    // Core Courses
    { id: '112', code: 'Comp/Stat 112', title: 'Introduction to DS', category: 'core', level: 1 },
    { id: '155', code: 'Stat 155', title: 'Intro to Stat Modeling', category: 'core', level: 1 },
    { id: '123', code: 'Comp 123', title: 'Core Concepts in CS', category: 'core', level: 1 },
    { id: '127', code: 'Comp 127', title: 'Object Oriented Prog', category: 'core', level: 2 },
    { id: '212', code: 'Comp/Stat 212', title: 'Intermediate DS', category: 'core', level: 3 },
    { id: '253', code: 'Stat 253', title: 'Stat Machine Learning', category: 'core', level: 3 },
    { id: '456', code: 'Comp/Stat 456', title: 'Projects in DS', category: 'core', level: 4 },

    // Math Requirements
    { id: 'm137', code: 'Math 137', title: 'Applied Multi Calc II', category: 'math', level: 1, prereqText: 'HS calc or Math 135' },
    { id: 'm236', code: 'Math 236', title: 'Linear Algebra', category: 'math', level: 2 },
    { id: 'm312', code: 'Math 312', title: 'Differential Eq.', category: 'math', level: 1, prereqText: 'Math 237' },

    // Electives - CS & Math
    { id: 'ms354', code: 'Math/Stat 354', title: 'Probability', category: 'elective', level: 3, prereqText: 'Math 137' },
    { id: 'c302', code: 'Comp 302', title: 'Databases', category: 'elective', level: 2, prereqText: 'Comp 123 or Comp/Stat 112' },
    { id: 'c320', code: 'Comp 320', title: 'Comp Bio', category: 'elective', level: 2, prereqText: 'Comp 123' },
    { id: 'c365', code: 'Comp 365', title: 'Comp Linear Algebra', category: 'elective', level: 3, prereqText: 'Comp 123 and Math 236' },
    { id: 'c435', code: 'Comp 435', title: 'Data Viz', category: 'elective', level: 3, prereqText: 'Comp 127' },
    { id: 'c221', code: 'Comp 221', title: 'Algorithms', category: 'elective', level: 1, prereqText: 'Comp 128 and Math 279' },
    { id: 'c440', code: 'Comp 440', title: 'Collective Intell.', category: 'elective', level: 3 },
    { id: 'c484', code: 'Comp 484', title: 'Intro to AI', category: 'elective', level: 3 },
    { id: 'm432', code: 'Math 432', title: 'Math Modeling', category: 'elective', level: 2 },

    // Electives - Stat & Advanced
    { id: 's451', code: 'Stat 451', title: 'Causal Inference', category: 'elective', level: 4, prereqText: 'Stat 155 and Math/Stat 354' },
    { id: 's452', code: 'Stat 452', title: 'Correlated Data', category: 'elective', level: 4, prereqText: 'Stat 155 and Math/Stat 354' },
    { id: 's453', code: 'Stat 453', title: 'Survival Analysis', category: 'elective', level: 4, prereqText: 'Stat 155 and Math/Stat 354' },
    { id: 's454', code: 'Stat 454', title: 'Bayesian Statistics', category: 'elective', level: 4, prereqText: 'Stat 155 and Math/Stat 354' },
    { id: 's494', code: 'Stat 494', title: 'Topics Course', category: 'elective', level: 4, prereqText: 'Stat 155 and Math/Stat 354' },
    { id: 'cm479', code: 'Comp/Math 479', title: 'Network Science', category: 'elective', level: 4 }
  ],
  edges: [
    // Required Prerequisite Solid Lines
    { from: '112', to: '212', type: 'required' },
    { from: '155', to: '212', type: 'required' },
    { from: '155', to: '253', type: 'required' },
    { from: '123', to: '127', type: 'required' },
    { from: '123', to: '212', type: 'required' },
    { from: '212', to: '456', type: 'required' },
    { from: '253', to: '456', type: 'required' },

    // Recommended Order (Dotted lines)
    { from: '112', to: '155', type: 'recommended', dashes: [2, 4] },
    { from: '127', to: '212', type: 'recommended', dashes: [2, 4] },
    { from: 'm137', to: 'm236', type: 'recommended', dashes: [2, 4] },

    // Prerequisites for Electives
    { from: 'm137', to: 'ms354', type: 'required' },
    { from: '123', to: 'c302', type: 'option', dashes: true },
    { from: '112', to: 'c302', type: 'option', dashes: true },
    { from: '123', to: 'c320', type: 'required' },
    { from: '123', to: 'c365', type: 'required' },
    { from: 'm236', to: 'c365', type: 'required' },
    { from: '127', to: 'c435', type: 'required' },
    { from: 'c221', to: 'c440', type: 'required' },
    { from: 'c221', to: 'c484', type: 'required' },
    { from: 'm312', to: 'm432', type: 'required' },

    // Advanced Stat Connections
    { from: '155', to: 's451', type: 'required' },
    { from: 'ms354', to: 's451', type: 'required' },
    { from: '155', to: 's452', type: 'required' },
    { from: 'ms354', to: 's452', type: 'required' },
    { from: '155', to: 's453', type: 'required' },
    { from: 'ms354', to: 's453', type: 'required' },
    { from: '155', to: 's454', type: 'required' },
    { from: 'ms354', to: 's454', type: 'required' },
    { from: '155', to: 's494', type: 'required' },
    { from: 'ms354', to: 's494', type: 'required' },
    { from: 'ms354', to: 'cm479', type: 'option', dashes: true }
  ]
};
