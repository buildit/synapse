# Midas

Midas (Management Information Dashboard) was the previous version/iteration of Synapse and this document is meant to explain the history, issues and why we needed to do a major refactoring and create Synapse. I've broken it out in a couple of different sections. One thing to keep in mind this is not meant as a blame document. This is meant to help new eng's understand some context of the app.

  - How did Midas start (Phase 1/POC)?
  - Phase 2
  - Phase 3
  - Why did we have to refactor (Phase 4/Synapse)?
  - Bottom line


> How did Midas start (Phase 1)?

- Midas started off as a very simple/basic/POC worked on by one eng in between projects. You can refer to the main read me file to understand the overall purpose of the app.
- The work being done at that point was mostly back end work. (space here when its clearer what exactly that work was).
- The tech stack at that time was python with some js and d3 thrown in. There was no major reason or decision point why that tech stack was chosen. Probably just what the dev working on it at that moment was most comfortable with.
- It did have some mock ups.


> Phase 2

 - Phase two involved starting from scratch and moving to a new tech stack.
 - The tech stack was react/d3.
 - The reason moving to the react tech stack was two fold. Part one is that again the dev working on the app was most comfortable with that stack and two there was a lot of talk about atomic design and the dev felt it react was the best way to implement that atomic design approach.
  - It was not connected to any sort of DB and used static text for project details and randomly generated  data.
  - It didn't connect to any real data cause at that point there was no access to any client data.
  - There was no kaban board or backlog of features/functionality.

> Phase 3

  - Phase three consisted of taking the POC and working on flushing out or adding features. It seemed (at the time) the better choice.
  - The approach was more lets get this idea/iteration in front of the client to better help refine the app.
  - The charts where refined and the navigation was improved by removing many of the views that had been in the original mock ups that where not really needed for the first version/release of the app.
  - There was a Kaban board implement and the start of a backlog as well as reg stand up meetings
  - It was also connected to real data. At this point the app should have undergone a refactor since how the data was structured and accessed was different than how the app was expecting it.
  - There was an attempt at adding redux to the app but it was not done app wide.


> Why did we have to refactor(Phase 4)?


  - There was never a overall approach/pattern to how the app was developed hence there where literally many different coding styles/approaches.
  - The POC was never meant to become the full on production version of the app.
  - Trying to shoehorn any sort of linting, testing or coding standards into the app was becoming almost impossible.
  - Redux was implemented on some of the pages/views but not all of them which made it hard for a new eng to follow and make any sort of updates.


> Bottom line


It became clear that the app could not proceed in its current version. Making ant sort of updates or changing the scope of any feature became beyond difficult and time consuming. It took a fair amount of time and pain but once we finished the refactor we now have a better more stable app. In many ways the app is more aligned to how we want to build app using best practices and coding standards. We can use it as model/talking point for the front end tribe as well as a model for how we want to create apps.  
