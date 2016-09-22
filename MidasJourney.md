# Midas

Midas (Management Information Dashboard) was the previous version/iteration of Synapse and this document is meant to explain the history, issues and why we needed to do a major refactoring and create Synapse. I've broken it out in a couple of different sections. One thing to keep in mind this is not meant as a blame document. This is meant to help new eng's understand some context of the app.

  - How did Midas start (Phase 1/POC)?
  - Phase 2
  - Why did we have to refactor (Phase 3/Synapse)?
  - Bottom line


> How did Midas start (Phase 1)?


  - Midas started off as a very simple/basic/POC react project worked on by a few eng's in between projects. You can refer to the main read me file to understand the overall purpose of the app.
  - It was not connected to any sort of DB and used static text for project details and randomly generated  data.
  - It didn't connect to any real data cause at that point there was no access to any client data.
  - There was no kaban board or backlog of features/functionality.
  - It did have some mock ups.


> Phase 2


  - Phase two consisted of taking the POC and working on flushing out or adding features. It seemed (at the time) the better choice.
  - The approach was more lets get this idea/iteration in front of the client to better help refine the app.
  - The charts where refined and the navigation was improved by removing many of the views that had been in the original mock ups that where not really needed for the first version/release of the app.
  - There was a Kaban board implement and the start of a backlog as well as reg stand up meetings
  - It was also connected to real data. At this point the app should have undergone a refactor since how the data was structured and accessed was different than how the app was expecting it.
  - There was an attempt at adding redux to the app but it was not done app wide.


> Why did we have to refactor(Phase 3)?


  - There was never a overall approach/pattern to how the app was developed hence there where literally many different coding styles/approaches.
  - The POC was never meant to become the full on production version of the app.
  - Trying to shoehorn any sort of linting, testing or coding standards into the app was becoming almost impossible.
  - Redux was implemented on some of the pages/views but not all of them which made it hard for a new eng to follow and make any sort of updates.


> Bottom line


It became clear that the app could not proceed in its current version. Making ant sort of updates or changing the scope of any feature became beyond difficult and time consuming. It took a fair amount of time and pain but once we finished the refactor we now have a better more stable app. In many ways the app is more aligned to how we want to build app using best practices and coding standards. We can use it as model/talking point for the front end tribe as well as a model for how we want to create apps.  
