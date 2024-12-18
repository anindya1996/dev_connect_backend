# devConnect API

# authRouter

- POST/signup
- POST/login
- POST/logout

# profileRouter

- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password- Forgot Password API

# connectionRequestRouter

- POST/request/send/:status/:userID
- POST/request/review/:status/:requestID
  Status:ignored,interested,accepted,rejected

# userRouter

- GET/user/requests/received
- GET/user/connections
- GET/user/feed- Gets you the profiles of other users in the platform
