# AUSiteBuilder

Express server that allows a set of users (shared credentials) to login and create their own personalized webpages. The users are able to view (and edit the source code of) any of the pages in the group that shares their credentials.  

The credentials used are hardcoded as well as the users that belong to the credential group. This should ideally reside somewhere else, but hey, this app is made just quick and easy. 

The api documentation: 

- GET api/names (return the users in the session specified by the JWT) 
- GET api/file/:ref (return the HTML page of the user with Id = :ref)
- POST api/file/:ref (create or update the HTML page of the user with Id = :ref)
- POST api/uploadImg (upload an image for a user) BODY: consist of an image, using multer to process image


