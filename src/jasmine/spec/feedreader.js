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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('url is defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* TODO: Write a test that loops through each feed
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


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var menuIcon,
            menuHidden,
            menuClass;

        //Asign DOM elements to variables before each spec
        beforeEach(function(done) {
            menuHidden = document.getElementsByClassName('menu-hidden')[0];
            menuIcon = document.getElementsByClassName('menu-icon-link')[0];
            done();
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        //if menu is hidden, menuHidden should be defined
        it('is hidden', function(done) {
            expect(menuHidden).toBeDefined();
            done();
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggles on click', function(done) {
            menuIcon.click();
            menuClass = menuHidden.className;
            //menu-hidden class should be removed
            expect(menuClass).toBe('');

            menuIcon.click();
            menuClass = menuHidden.className;
            //menu-hidden class should be added
            expect(menuClass).toBe('menu-hidden');

            done();
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //run loadFeed function before spec
        beforeEach(function(done) {
            loadFeed(2, function() {
                done();
            });
        });

        it('at least one', function(done) {
            var entry = document.getElementsByClassName('entry');
            //entry array should contain at least one element
            expect(entry.length).not.toBe(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"*/

    describe('New Feed Selection', function() {
        var headerTitle,
            firstEntry,
            newHeaderTitle,
            newFirstEntry;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
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