const templates = {
  "Frontend Developer": [
    { title: "Module 1: Layout & Design", tasks: [
      { name: "HTML5 Semantic Tags", time: "3h", desc: "Build a resume using <header>, <article>, and <section>.", info: "Semantic HTML tells the browser exactly what content is (e.g., navigation vs footer).", resource: "https://web.dev/learn/html/semantic-html/" },
      { name: "Flexbox Mastery", time: "5h", desc: "Create a 3-column pricing table.", info: "Flexbox is a 1D layout model for alignment and space distribution.", resource: "https://flexboxfroggy.com/" },
      { name: "CSS Grid Systems", time: "6h", desc: "Build a Pinterest-style image masonry gallery.", info: "Grid is a 2D system that handles both columns and rows simultaneously.", resource: "https://css-tricks.com/snippets/css/complete-guide-grid/" }
    ]},
    { title: "Module 2: Logic & Interactivity", tasks: [
      { name: "ES6 Fundamentals", time: "8h", desc: "Filter and Map a list of users from a dummy array.", info: "Modern JS features like arrow functions and destructuring make code cleaner.", resource: "https://javascript.info/" },
      { name: "DOM Manipulation", time: "10h", desc: "Build a dynamic calculator app.", info: "The DOM is the interface between your code and the HTML visible to users.", resource: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model" },
      { name: "Async & Fetch API", time: "7h", desc: "Fetch real-time data from the OpenWeather API.", info: "Asynchronous JS allows you to load data without refreshing the page.", resource: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" }
    ]}
  ],

  "Backend Developer": [
    { title: "Module 1: Server Architecture", tasks: [
      { name: "Node.js Basics", time: "5h", desc: "Set up a local server using the 'http' module.", info: "Node.js allows JavaScript to run on the server-side.", resource: "https://nodejs.org/en/learn" },
      { name: "Express Framework", time: "6h", desc: "Build a RESTful API for a Book Store.", info: "Express simplifies routing and server-side logic in Node.", resource: "https://expressjs.com/" },
      { name: "Middleware Design", time: "4h", desc: "Create a custom request logger for your server.", info: "Middleware functions have access to the request and response objects.", resource: "https://expressjs.com/en/guide/using-middleware.html" }
    ]},
    { title: "Module 2: Data Persistence", tasks: [
      { name: "MongoDB Schema Design", time: "8h", desc: "Model a User and Product schema for an E-commerce app.", info: "Schemas define the structure of documents in a NoSQL database.", resource: "https://mongoosejs.com/docs/guide.html" },
      { name: "CRUD Operations", time: "7h", desc: "Build a 'Notes' app with Create, Read, Update, Delete functionality.", info: "CRUD is the backbone of almost every dynamic application.", resource: "https://www.mongodb.com/basics/crud" },
      { name: "JWT Authentication", time: "12h", desc: "Implement a secure Login system using JWT.", info: "JSON Web Tokens allow for stateless, secure user sessions.", resource: "https://jwt.io/introduction/" }
    ]}
  ],

  "Full Stack Developer": [
    { title: "Module 1: Frontend-Backend Sync", tasks: [
      { name: "Axios Integration", time: "5h", desc: "Connect your React app to an Express API.", info: "Axios is a promise-based HTTP client for the browser and node.js.", resource: "https://axios-http.com/" },
      { name: "State Syncing", time: "8h", desc: "Update your database when a React checkbox is clicked.", info: "Ensuring your UI matches the data stored in MongoDB.", resource: "https://react.dev/learn/sharing-state-between-components" },
      { name: "CORS Configuration", time: "3h", desc: "Fix 'Cross-Origin' errors between different ports.", info: "CORS is a security feature that controls how different domains talk.", resource: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" }
    ]},
    { title: "Module 2: Deployment & Scaling", tasks: [
      { name: "Environment Variables", time: "2h", desc: "Hide your DB password using .env files.", info: "Security best practice to keep secrets out of your code.", resource: "https://www.npmjs.com/package/dotenv" },
      { name: "Vercel/Heroku Deploy", time: "6h", desc: "Push your full-stack app to the cloud.", info: "Cloud platforms allow anyone in the world to access your site.", resource: "https://vercel.com/docs" },
      { name: "Database Indexing", time: "5h", desc: "Optimize MongoDB queries for faster results.", info: "Indexes support the efficient execution of queries in MongoDB.", resource: "https://www.mongodb.com/docs/manual/indexes/" }
    ]}
  ],

  "Data Scientist": [
    { title: "Module 1: Data Wrangling", tasks: [
      { name: "Python for Data", time: "10h", desc: "Learn NumPy and list comprehensions.", info: "Python is the primary language for data science due to its libraries.", resource: "https://www.python.org/" },
      { name: "Pandas DataFrames", time: "12h", desc: "Load and clean a CSV of stock market data.", info: "Pandas is the 'Excel of Python' for data manipulation.", resource: "https://pandas.pydata.org/" },
      { name: "Data Cleaning", time: "8h", desc: "Handle missing values in a Titanic dataset.", info: "Cleaning data is 80% of a Data Scientist's job.", resource: "https://towardsdatascience.com/data-cleaning-with-python-and-pandas-7232230a6231" }
    ]},
    { title: "Module 2: Visualization & Stats", tasks: [
      { name: "Matplotlib & Seaborn", time: "6h", desc: "Create heatmaps and scatter plots.", info: "Visualizing data helps identify patterns that numbers can't show.", resource: "https://matplotlib.org/" },
      { name: "Statistical Hypothesis", time: "15h", desc: "Run a T-test on two sets of user data.", info: "Statistics helps determine if data patterns are real or random.", resource: "https://www.khanacademy.org/math/statistics-probability" },
      { name: "Exploratory Data Analysis", time: "10h", desc: "Produce a 5-page report on a raw dataset.", info: "EDA is the process of performing initial investigations on data.", resource: "https://en.wikipedia.org/wiki/Exploratory_data_analysis" }
    ]}
  ],

  "ML Engineer": [
    { title: "Module 1: Basic Models", tasks: [
      { name: "Linear Regression", time: "12h", desc: "Predict house prices based on square footage.", info: "The simplest ML algorithm for predicting numbers.", resource: "https://scikit-learn.org/stable/modules/linear_model.html" },
      { name: "Logistic Regression", time: "10h", desc: "Classify if an email is Spam or Not Spam.", info: "Used for binary classification (Yes/No answers).", resource: "https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html" },
      { name: "Decision Trees", time: "8h", desc: "Build a model to predict student success.", info: "Models that make decisions based on flowchart logic.", resource: "https://scikit-learn.org/stable/modules/tree.html" }
    ]},
    { title: "Module 2: Advanced AI", tasks: [
      { name: "Neural Networks", time: "20h", desc: "Build a digit classifier with TensorFlow.", info: "Algorithms inspired by the human brain for complex patterns.", resource: "https://www.tensorflow.org/tutorials" },
      { name: "NLP (Text Processing)", time: "15h", desc: "Analyze the sentiment of movie reviews.", info: "Teaching computers to understand human language.", resource: "https://www.nltk.org/" },
      { name: "Computer Vision", time: "18h", desc: "Detect faces in a webcam feed using OpenCV.", info: "Enabling machines to see and interpret images.", resource: "https://opencv.org/" }
    ]}
  ],

  "Cybersecurity Analyst": [
    { title: "Module 1: Offensive Security", tasks: [
      { name: "Nmap Basics", time: "5h", desc: "Scan your local network for open ports.", info: "Network mapping is the first step in identifying vulnerabilities.", resource: "https://nmap.org/" },
      { name: "SQL Injection", time: "10h", desc: "Bypass a login page on a vulnerable test site.", info: "A top-tier vulnerability where hackers inject malicious code.", resource: "https://owasp.org/www-community/attacks/SQL_Injection" },
      { name: "Password Cracking", time: "8h", desc: "Use John the Ripper to test password strength.", info: "Testing how long it takes to break encrypted passwords.", resource: "https://www.openwall.com/john/" }
    ]},
    { title: "Module 2: Defensive Security", tasks: [
      { name: "Firewall Configuration", time: "6h", desc: "Set up UFW on a Linux server.", info: "Firewalls block unauthorized traffic from entering a network.", resource: "https://wiki.ubuntu.com/UncomplicatedFirewall" },
      { name: "Intrusion Detection", time: "12h", desc: "Monitor server logs for suspicious activity.", info: "IDS systems alert admins when a breach is attempted.", resource: "https://www.snort.org/" },
      { name: "Encryption (SSL/TLS)", time: "5h", desc: "Install an SSL certificate on a website.", info: "Encryption ensures data can't be read if intercepted.", resource: "https://letsencrypt.org/" }
    ]}
  ],

  "DevOps Engineer": [
    { title: "Module 1: Containerization", tasks: [
      { name: "Docker Architecture", time: "6h", desc: "Create an image for your React app.", info: "Containers package code so it runs the same everywhere.", resource: "https://docs.docker.com/" },
      { name: "Docker Compose", time: "5h", desc: "Run your Frontend and Backend together.", info: "Orchestrating multiple containers with a single command.", resource: "https://docs.docker.com/compose/" },
      { name: "Kubernetes Basics", time: "15h", desc: "Deploy a pod to a local K8s cluster.", info: "K8s automates the scaling and management of containers.", resource: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" }
    ]},
    { title: "Module 2: CI/CD & Cloud", tasks: [
      { name: "GitHub Actions", time: "8h", desc: "Automate testing on every code push.", info: "Continuous Integration prevents broken code from being saved.", resource: "https://github.com/features/actions" },
      { name: "Terraform (IaC)", time: "10h", desc: "Write code to create an AWS S3 bucket.", info: "Infrastructure as Code lets you build servers with scripts.", resource: "https://www.terraform.io/" },
      { name: "Monitoring (Prometheus)", time: "7h", desc: "Set up a dashboard to track server health.", info: "You can't manage what you don't measure.", resource: "https://prometheus.io/" }
    ]}
  ],

  "Android Developer": [
    { title: "Module 1: Kotlin & UI", tasks: [
      { name: "Kotlin Syntax", time: "10h", desc: "Build a unit converter CLI tool.", info: "Kotlin is the modern, safe alternative to Java for Android.", resource: "https://kotlinlang.org/" },
      { name: "Jetpack Compose", time: "12h", desc: "Build a Material 3 News Feed UI.", info: "The modern way to build native Android UI.", resource: "https://developer.android.com/jetpack/compose" },
      { name: "Navigation Component", time: "6h", desc: "Handle movement between app screens.", info: "Proper navigation ensures a smooth user experience.", resource: "https://developer.android.com/guide/navigation" }
    ]},
    { title: "Module 2: Advanced Android", tasks: [
      { name: "MVVM Architecture", time: "15h", desc: "Separate your data logic from your UI logic.", info: "The industry standard pattern for Android apps.", resource: "https://developer.android.com/topic/architecture" },
      { name: "Retrofit & Networking", time: "10h", desc: "Fetch images from the Unsplash API.", info: "Most apps need to talk to the internet to be useful.", resource: "https://square.github.io/retrofit/" },
      { name: "Room Database", time: "12h", desc: "Cache user data for offline use.", info: "Storing data locally so the app works without Wi-Fi.", resource: "https://developer.android.com/training/data-storage/room" }
    ]}
  ],

  "UI/UX Designer": [
    { title: "Module 1: Design Principles", tasks: [
      { name: "Typography & Color", time: "5h", desc: "Design a style guide for a luxury brand.", info: "Fonts and colors evoke emotions and guide user actions.", resource: "https://uxdesign.cc/" },
      { name: "Wireframing", time: "8h", desc: "Draw low-fidelity sketches for a food app.", info: "Skeleton designs used to map out functionality.", resource: "https://www.figma.com/resource-library/wireframing-guide/" },
      { name: "Figma Auto Layout", time: "10h", desc: "Build a responsive button component.", info: "Auto Layout makes designs adapt automatically to content.", resource: "https://help.figma.com/hc/en-us/articles/360031356513" }
    ]},
    { title: "Module 2: Prototyping", tasks: [
      { name: "High Fidelity Flows", time: "12h", desc: "Create a clickable checkout process.", info: "Interactive prototypes look and feel like a real app.", resource: "https://help.figma.com/hc/en-us/articles/360040314193" },
      { name: "User Research", time: "15h", desc: "Conduct 3 user interviews on your design.", info: "Designing based on real human feedback, not guesses.", resource: "https://www.nngroup.com/articles/user-research-methods/" },
      { name: "Design Handoff", time: "4h", desc: "Prepare a file with CSS specs for developers.", info: "Ensuring the final product looks exactly like the design.", resource: "https://www.zeplin.io/" }
    ]}
  ],

  "Cloud Architect": [
    { title: "Module 1: AWS Fundamentals", tasks: [
      { name: "IAM Security", time: "4h", desc: "Set up user roles and permissions.", info: "Controlling who can access which cloud resources.", resource: "https://aws.amazon.com/iam/" },
      { name: "EC2 Virtual Servers", time: "7h", desc: "Launch and host a website on a Linux instance.", info: "Renting server space in the Amazon cloud.", resource: "https://aws.amazon.com/ec2/" },
      { name: "S3 Storage", time: "5h", desc: "Configure an S3 bucket for static hosting.", info: "Scalable object storage for files and assets.", resource: "https://aws.amazon.com/s3/" }
    ]},
    { title: "Module 2: Serverless & Scaling", tasks: [
      { name: "Lambda Functions", time: "10h", desc: "Write a function that resize images on upload.", info: "Running code without managing any servers.", resource: "https://aws.amazon.com/lambda/" },
      { name: "Relational DB (RDS)", time: "8h", desc: "Deploy a managed SQL database.", info: "Cloud-hosted databases with automatic backups.", resource: "https://aws.amazon.com/rds/" },
      { name: "Load Balancing", time: "12h", desc: "Distribute traffic across 3 global servers.", info: "Ensuring your app stays up even if one server fails.", resource: "https://aws.amazon.com/elasticloadbalancing/" }
    ]}
  ]
};

module.exports = templates;