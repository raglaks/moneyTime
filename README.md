# MoneyTime

## A full-stack web-app to manage your daily spending.

MoneyTime is a web-app to manage and view your spending habits. Once an account is created, the user can  start inputting each one of their expenses. They can also organize their expenses by categories of their choice. The account tab displays a whole overview of the user's monthly spending in a table. It also shows two data visualization elements—a pie chart to show expenses by category and a bar chart to show monthly spending totals. Existing expense entries can also be updated or deleted. 

### Notable features

#### bcryptjs

A Node package manager for hashing and salting passwords. It is implemented when a new user creates an account. Their password is hashed, salted and then stored in the API. When a user logs in, the bcryptjs compare method is run to check if the current password (after hashing and salting) is the same as the API password. 

### About the project

MoneyTime was built for Tec de Monterrey's full-stack web development bootcamp. The project required Node.js, Express.js and a Sequelize ORM (connected to a mySQL database) to meet the grading criteria. It also required clean code and clean design. 


### Dev experiences

_ "As a web-development student, building a functional back-end was always a daunting task for me. I never quite understood what Express.js did and was also put off by the lack of visual aids when writing server-side code. But for this project, I chose to get a good grasp on the server-side build by taking on the HTML and API routing for the whole app. At first, I was obviously lost in spaghetti code, copied and pasted from vague Stack Overflow queries. But after a few solid hours on YouTube and going through Express.js' neat documentation, I finally began to understand and my work resulted in a functional user-system. _

_ My takeaway from this experience is that learning-by-doing is really the only key for my success as a future web-developer. -[Raghava Lakshminarayana](https://github.com/raglaks)" _ 

