/**
 * sessionManager.spec.js
 *
 * @author: Harish Anchu <harishanchu@gmail.com>
 * @copyright 2015, Harish Anchu. All rights reserved.
 * @license Licensed under MIT
 */

var SessionManager = require('../../lib/SessionManager');
var FileSessionHandler = require('../../lib/handler/FileSessionHandler');
var DatabaseSessionHandler = require('../../lib/handler/DatabaseSessionHandler');
var Store = require('../../lib/store/Store');

describe('SessionManager', function(){
    var driver = 'file';
    var manager = new SessionManager({
        driver: driver
    });

    describe('#constructor', function(){
       it('should return an instance os SessionManager', function(done){
           manager.should.be.an.instanceOf(SessionManager);

           done();
       });
    });

    describe('method#getDefualtDriver', function(){
        it('should return default driver', function(done){
            manager.getDefaultDriver().should.be.equal(driver);
            done();
        });
    });

    describe('method#driver', function(){
        describe('with no attributes', function(){
            it('should create and return instance of session store with default session handler', function(done){
                var driver = manager.driver();

                driver.should.be.an.instanceOf(Store);
                driver.getHandler().should.be.an.instanceOf(FileSessionHandler);

                done();
            });
        });

        describe('with driver attribute \'file\'', function(){
            it('should create and return instance of session store with file session handler', function(done){
                var driver = manager.driver('file');

                driver.should.be.an.instanceOf(Store);
                driver.getHandler().should.be.an.instanceOf(FileSessionHandler);

                done();
            });
        });

        describe('with driver attribute \'database\'', function(){
            it('should create and return instance of session store with database session handler', function(done){
                var manager = new SessionManager({
                    driver: 'database',
                    table: 'sessions',
                    connection: {
                        adapter: 'sails-disk'
                    }
                });
                var driver = manager.driver('database');

                driver.should.be.an.instanceOf(Store);
                driver.getHandler().should.be.an.instanceOf(DatabaseSessionHandler);

                done();
            });
        });

    });
});
