# SEA LEVEL RISE REAL ESTATE REPRICER

## USER STORY
>* As a user, I want to be directed to a website where I can browse real estate offers (both for sale and not for sale) in tandem with data about current and future predicted sea level rise.

>* Users will have full auth capabilities, being able to securely sign up, sign in, and sign out.

>* When not signed in, users will still have access to search functionality and show pages for all properties. When signed in, users will have access to "MyProperties" which is a page displaying any real estate offers that they have saved 

>* Users can click on a specific property to view that property's show page which will have information including full address, photos, list price / estimated valuation, year built, previous sale prices and year sold, number of beds, number of baths, square footage, and any amenities offered.

>* Users will have the ability to search based the full address to find a specific property or zip code to find properties in a specific area (utilize GoogleMaps API). (POST MVP: integrate current location as a search option)

>* Users will have the ability to upload their property for sale, edit the property, and delete the property listing. Only the owner of each listing will have the ability to edit/delete that listing.

## APIs
>* Proprietary backend API built for user authentication, property attributes, comments/reviews, and seeded data. Database will save searched addresses, property uploads, and comments/reviews.
>* Third party Zillow API to bring in (https://www.zillow.com/howto/api/APIOverview.htm)
>* Third party Geospacial World API for sea level rise data by address (https://www.geospatialworld.net/news/sea-level-rise-data-for-every-address-in-the-usa-is-now-in-the-hazardhub-api/)
>* Third party GoogleMaps API for geolocation of property search

## Tech Stack
>* I will be using a tech stack comprised of Django/Python on the back end and Javascript/React for the front end.

## MVP of project
1. Allow users to sign-up, login, and logout
2. Allow users to browse real estate based on searching an address or zip code
3. Allow users to click on individual listings, bringing them to the show page of the listing with property information.
4. Allow users to leave a comment on an individual listing
5. Allow users to create their own listing to sell a property.
6. Allow users to delete only their own property listing.
7. Allow users to only edit their own property information.
8. Allow users to go to their MyProperties page, which will display listings that they added. On this page, users will have the ability to edit/delete listings.
9. Search functionality

## Stretch Goals / Post-MVP
1. Integrate sea level rise data and display on show page
2. Predict price increase / decrease based on future projected sea level rise
3. Integrate Google Maps API to display geolocation map of search