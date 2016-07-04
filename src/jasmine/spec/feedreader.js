/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url is defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {
        var $bodyElem = $('body'),
            $menuIcon = $('.menu-icon-link');

        /* Test that ensures the menu element is
         * hidden by default.
         *if menu is hidden, $bodyElem should be defined
        */
        it('is hidden', function() {
            expect($($bodyElem).hasClass('menu-hidden')).toBeTruthy();
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('toggles on click', function() {
            $menuIcon.click();
            //menu-hidden class should be removed
            expect($($bodyElem).hasClass('menu-hidden')).toBeFalsy();

            $menuIcon.click();
            //menu-hidden class should be added
            expect($($bodyElem).hasClass('menu-hidden')).toBeTruthy();

        });

    });

    /* Test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

        //run loadFeed function before spec
        beforeEach(function(done) {
            loadFeed(2, done);
        });

        it('at least one', function() {
            var entry = document.querySelectorAll('.feed .entry');
            //entry array should contain at least one element
            expect(entry.length).not.toBe(0);
        });
    });

    /* Test suite named "New Feed Selection"*/

    describe('New Feed Selection', function() {
        var headerTitle,
            firstEntry,
            newHeaderTitle,
            newFirstEntry;

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

         //run loadFeed before spec
        beforeEach(function(done) {
            loadFeed(2, function(){
                //callback function to get refreshed dom elements
                headerTitle = document.getElementsByClassName('header-title')[0].textContent;
                firstEntry = document.getElementsByClassName('entry')[0].textContent;
                done();
            });
        });

        it('loads new feed', function(done) {
            //call loadFeed again to check elements change
            loadFeed(0, function(){
                //callback function to get refreshed dom elements
                newHeaderTitle = document.getElementsByClassName('header-title')[0].textContent;
                newFirstEntry = document.getElementsByClassName('entry')[0].textContent;
                //expect headers and entry not to be the same given the loadFeed call of different feed
                expect(headerTitle).not.toEqual(newHeaderTitle);
                expect(firstEntry).not.toEqual(newFirstEntry);
                done();
            });

        });

    });


}());
