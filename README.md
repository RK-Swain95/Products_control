# Products_control

Creating an application to parse the following JSON file.

URL-> https://mindler-dashboard.s3.us-east-2.amazonaws.com/products.json

The JSON file contains 1000 records of products. Each product has the following 4 attributes
- Subcategory
- Title
- Price
- Popularity


By maintaining MVC architecture I am getting below tasks

1. Find the list of subcategory as mobile and title like LG or lg.

2. Find the ids of subcategory as mobile and title like LG or lg.

3. Find the top five record based on popularity of all subcategory.

4. find the mobile and no of record whose price range is between 2000 to 9500 and mobile will be
like Nokia and Zen and Xolo

5. find the product of all subcategory whose popularity is less than 500;

6. find the total record and all subcategory product record.
ans will be like:-
{
total: 300
subcategory: {
mobile:120,
tablet:180
}
}

7. find the price of smart-watches subcategory whose price is greater than 10000 and sort by
popularity high to low
