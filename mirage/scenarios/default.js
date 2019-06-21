export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  server.createList('city-hit', 10);
  server.create('city-hit', {insee_code: 'foo'});
}
