# Midas

Midas was the previous version/interation of Synapse and this document is meant to explain the issues and why we needed to do a major refactoring and create Synapse. I've broken it out in a couple of different sections. One thing to keep in mind this is not meant as a blame document. 

  - The overriding goal for Midas/Synapse
  - How did it Midas start?
  - What happened after the US front end team took over?
  - Why did we have to refactor?
  - Bottom line


> The overall goal for Midas/Synapse


The goal is create a tool set where we could take client date regading projects and help them vizulize what is really going on with thier programs and projects. It does this through the use of mostly charts and other visual tools. At this moment it is meant as software that we (build it) use but down the line it is meant as a tool the client will use directly.


> How did it Midas start?


  - Midas started off as a very simple/basic react project. 
  - It was not connected to any sort of DB and used static text for project details and randomly genreated data.
  - It didnt connect to any real data cause at that point there was no access to any client data.
  - There was no kaban board or backlog of features/functionality.
  - It did have some mock ups.


> What happened after the US front end team took over?


Once the US team took over it seemed (at the time) the better choice to just take the POC and build off of that since many of the features had not ben flushed out. The approach was more lets get this idea/interation in front of the client to better help refine the app. This was prob the first mistake. Once there was access to any sort of real data the app should have undergone a refactor since how the data was structured and accessed was different than how the app was expecting it. 

Even though we had implement a kaban board where stories where created and tracked we where still building on top on a POC that was never meant to become the full app. 


> Why did we have to refactor?


  - There was never a overall approach/pattern to how the app was developed hence there where literally many different coding styles/approaches.
  - Trying to shoehorn any sort of linting, testing or coding standards into the app was becoming almost impossible.
  - Redux was implemented on some of the pages/views but not all of them which made it hard for a new eng to follow and make any sort of updates.


> Bottom line


It became clear that the app could not proceed in its current version. It took a fair amount of time and pain but once we finished the refactor we now have a better more stable app. In many ways the app is more aligned to how we want to build app using best practices and coding standards. We can use it as model/talking point for the front end tribe as well as a model for how we want to create apps.  




