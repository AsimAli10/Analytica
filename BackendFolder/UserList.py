from Seller import Seller
from Wholeseller import Wholeseller
from awsHandler import awsHandler

class UserList:
    def __init__(self):
        self.PersonList = []
        self.user=None
    #login function
    def login(self,email, password, usertype):
        db=awsHandler()
        result=db.login(email, password, usertype)
        #parse result to user object based on usertype
        return result
    #signup function
    def signup(self,name,password,email,phoneNumber,CNIC, userType):
        db=awsHandler()
        response=db.registerUser(name,email,password,CNIC,phoneNumber,userType)
        if response=="success":
            return db.login(email, password, userType)
        return response

    def getmail(self,cnic):
        db=awsHandler()
        return db.getmail(cnic)
        pass