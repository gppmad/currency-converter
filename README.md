# Currency Converter
Online Currency Converter.

**DOCUMENTATION**

The project has been developed using **Node.js. v.10.15.0**. Following the npm packages used:
-	**express:** to handle HTTP requests
-	**axios:** used to get XML data from the ECB website
-	**fast-xml-parser:** used to parse XML and convert into JSON
-	**lodash:** javascript library used to work easily with objects and array
-	**nodemon:** very useful during the development phase automatically restarting the node application when file changes are detected.

The api *‘/api/convert’* is called with the GET method and it expects as input an object into the body as the following:
```
                                            { 
                                              "amount" : "10",
                                              "src_currency" : "EUR",
                                              "dest_currency" : "USD",
                                              "reference_date" : "2020-03-20"
                                            }
```

The api gets the data from the ECB website as XML format.
Using the fast-xml-parser, XML data are converted into a JSON object. Then, using the Lodash library, the JSON object is inspected in order to get all information we need such as: list of currencies and conversion rate related to the reference_date.

If one of the parameters is wrong (empty parameter, currency not valid, date not valid or not in the ECB list), the api responds with an error message.

Four cases of currency conversion have been identified:

**Case 0:** both source and destination currencies are equal: the converted amount is equal to the input amount as well as the currency.

**Case 1:** the source currency is equal to EUR. The converted amount is calculated multiplying the conversion rate with the input amount.
```                                        
                                          final_amount = source_rate * amount
```
**Case 2:** both source and destination currencies are different than EUR. The input amount is converted to EUR and then converted to the destination currency. 
```
                                 final_amount = (1/source_rate) * amount * destination_rate
```
**Case 3:** the destination currency is equal to EUR. The converted amount is calculated multiplying the amount with the inverse of the conversion rate.
```
                                         final_amount = amount * (1/destination_rate)
```


**HOW TO USE THE APP**

Please follow the instructions in order to install and use the app:
1.	Install **Node.js** on your environment: the version must be equal or greater than 10.15.0;
2.	Clone the project **currency_converter** locally on your computer: For example, the project path can be “C:\Users\Projects\convert_api";
3.	Open the command prompt and go to the project folder path "C:\Users\Projects\convert_api". Then, run the server locally digiting 
```
                                                    npm run prod
```
4.	Install **Postman** on your computer and create a new HTTP request with the following configurations:

    a.	Method: **GET**

    b.	Url request: **localhost/api/convert**

    c.	Body: 

      - select **raw** 

      - select **JSON(application/json)**

      The request body must contain an object as the following:

    ```
                                              { 
                                                "amount" : "10",
                                                "src_currency" : "EUR",
                                                "dest_currency" : "USD",
                                                "reference_date" : "2020-03-20"
                                              }
    ```
    Change the body values and click Send: you’ll see on Postman the response to your request.	
