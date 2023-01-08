import Person
class Seller():
    def __init__(self, email,name,password, DOB,CNIC,phoneNumber):
        self.type= "Seller"
        #call Person constructor
        Person.__init__(self, name,email,password, DOB,phoneNumber,CNIC)
    

    def proposeDeal(self, deal):
        #call createDeal method from Deal class
        deal.createDeal(self)
        pass



        