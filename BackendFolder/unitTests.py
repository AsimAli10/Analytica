import unittest

from ProductCatalogue import ProductCatalouge


class MyTestCase(unittest.TestCase):

    #---------------- getSalesInsights--------------------------
    
    def test_salesInsightsforMobiles(self):
        
        # Expected output list
        expected_output = [453, 1080, 10041, 848, 1200, 2827, 2669, 698, 300]

        # Call the function
        p= ProductCatalouge()
        insights = p.getSalesInsights("Mobiles")
        print("\n\n\n Output:   \n",insights)
        actual_output =  insights['datasets']['data']
        

        # Assert that the actual output matches the expected output
        self.assertEqual(actual_output, expected_output)



    def test_salesInsightsforLaptops(self):
        
        # Expected output list
        expected_output = [2058, 2316, 4414, 5160, 5674, 5188, 4930, 4917, 6560]

        # Call the function
        p= ProductCatalouge()
        insights = p.getSalesInsights("Laptops")
        print("\n\n\n Output:   \n",insights)
        actual_output =  insights['datasets']['data']
        

        # Assert that the actual output matches the expected output
        self.assertEqual(actual_output, expected_output)
    
    def test_salesInsightsforAppliances(self):
        
        # Expected output list
        expected_output = [96, 204, 7333, 885, 613, 1477, 1367, 437, 170]

        # Call the function
        p= ProductCatalouge()
        insights = p.getSalesInsights("Home Appliances")
        print("\n\n\n Output:   \n",insights)
        actual_output =  insights['datasets']['data']
        

        # Assert that the actual output matches the expected output
        self.assertEqual(actual_output, expected_output)

    
    #---------------- getSalesForecast--------------------------

    def test_salesforecastforMobiles(self):
        
        # Expected output list
        expected_output = [1080, 10041, 848, 1200, 2827, 2669, 698, 300, 2397]

        # Call the function
        p= ProductCatalouge()
        insights = p.getSalesforecast("Mobiles")
        print("\n\n\n Output:   \n",insights)
        actual_output =  insights['datasets']['data']
        

        # Assert that the actual output matches the expected output
        self.assertEqual(actual_output, expected_output)



    def test_salesforecastforLaptops(self):
        
        # Expected output list
        expected_output = [2316, 4414, 5160, 5674, 5188, 4930, 4917, 6560, 6959]

        # Call the function
        p= ProductCatalouge()
        insights = p.getSalesforecast("Laptops")
        print("\n\n\n Output:   \n",insights)
        actual_output =  insights['datasets']['data']
        

        # Assert that the actual output matches the expected output
        self.assertEqual(actual_output, expected_output)
    
    def test_salesforecastforAppliances(self):
        
        # Expected output list
        expected_output = [204, 7333, 885, 613, 1477, 1367, 437, 170, 170]

        # Call the function
        p= ProductCatalouge()
        insights = p.getSalesforecast("Home Appliances")
        print("\n\n\n Output:   \n",insights)
        actual_output =  insights['datasets']['data']
        

        # Assert that the actual output matches the expected output
        self.assertEqual(actual_output, expected_output)

    
    #---------------- getdemographics--------------------------

    def test_getDemographicsforlaptop(self):
        p= ProductCatalouge()
        output = p.getDemographics("Laptop")
        expected_output = {
            'age_group': {'<18': 0, '18-25': 109, '26-35': 149, '36-50': 237, '50+': 505},
            'gender': {'Male': 484, 'Female': 516, 'Other': 0},
            'city': {'Islamabad': 260, 'Lahore': 241, 'Multan': 245, 'Karachi': 254}
        }
        assert output == expected_output, "Output doesn't match the expected output"


    def test_getDemographicsforMobile(self):
        p= ProductCatalouge()
        output = p.getDemographics("Mobiles")
        expected_output = {
            'age_group': {'<18': 0, '18-25': 93, '26-35': 156, '36-50': 198, '50+': 553},
            'gender': {'Male': 503, 'Female': 497, 'Other': 0}, 
            'city': {'Islamabad': 239, 'Lahore': 259, 'Karachi': 257, 'Multan': 245}
        }
        assert output == expected_output, "Output doesn't match the expected output"


    def test_getDemographicsforappliances(self):
        p= ProductCatalouge()
        output = p.getDemographics("home_appliances")
        expected_output = {
            'age_group': {'<18': 0, '18-25': 95, '26-35': 174, '36-50': 211, '50+': 520}, 
             'gender': {'Male': 507, 'Female': 493, 'Other': 0}, 
             'city': {'Islamabad': 228, 'Multan': 274, 'Lahore': 260, 'Karachi': 238}
        }
        assert output == expected_output, "Output doesn't match the expected output"






if __name__ == '__main__':
    unittest.main()
