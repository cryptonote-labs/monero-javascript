const assert = require("assert");
const GenUtils = require("../src/utils/GenUtils");
const IndexMarker = require("../src/utils/IndexMarker");

const MAX_INDEX = 10000;            // maximum index to mark
const NUM_MARKINGS = 5000;          // number of times to apply markings across indices
assert(MAX_INDEX >= NUM_MARKINGS);  // most tests assume some indices in the range will remain unmarked

/**
 * Tests the index marker.
 */
let marker = new IndexMarker();
describe("Test Index Marker", function() {
  
  beforeEach(function() {
    marker.reset();
  });
  
  it("Starts with nothing marked", function() {
    assert(!marker.isMarked(0, MAX_INDEX));
  });
  
  it("Can be reset so nothing is marked", function() {
    
    // mark random indices
    let indices = GenUtils.getRandomInts(0, MAX_INDEX, NUM_MARKINGS);
    indices = [0];
    assert(!marker.isMarked(1));
    marker.mark(indices);
    assert(marker.isMarked(indices));
    assert(marker.isMarked(0, MAX_INDEX) === undefined);  // some will not be marked
    
    // reset markings
    marker.reset();
    
    // nothing is marked
    assert(!marker.isMarked(0, MAX_INDEX));
  });
  
  it("Can mark single indices", function() {
    
    // fetch random indicies
    let indices = GenUtils.getRandomInts(0, MAX_INDEX, NUM_MARKINGS);
    
    // mark each index individually
    indices.map(idx => marker.mark(idx));
    
    // check marked indices
    assert(marker.isMarked(indices));                 // check as array
    indices.map(idx => assert(marker.isMarked(idx))); // check individually
    
    // check not marked indices
    let notMarkedIndices = [];
    for (let idx = 0; idx <= MAX_INDEX; idx++) {
      if (indices.includes(idx)) assert(marker.isMarked(idx));
      else notMarkedIndices.push(idx);
    }
    assert(notMarkedIndices.length > 0);
    assert(!marker.isMarked(notMarkedIndices));                 // check as array
    notMarkedIndices.map(idx => assert(!marker.isMarked(idx))); // check individually
    
    // check mixture of marked and unmarked indices across a range
    assert(marker.isMarked(0, MAX_INDEX) === undefined);
  });
  
  it("Can mark an array of indices", function() {
    assert(marker.isMarked(0, MAX_INDEX) === false); // ensure starting with reset state
    
    // fetch random indicies
    let indices = GenUtils.getRandomInts(0, MAX_INDEX, NUM_MARKINGS);
    
    // mark indices as array
    marker.mark(indices);
    
    // check marked indices
    assert(marker.isMarked(indices));                 // check as array
    indices.map(idx => assert(marker.isMarked(idx))); // check individually
    
    // check not marked indices
    let notMarkedIndices = [];
    for (let idx = 0; idx <= MAX_INDEX; idx++) {
      if (indices.includes(idx)) assert(marker.isMarked(idx));
      else {
        assert(!marker.isMarked(idx));
        notMarkedIndices.push(idx);
      }
    }
    assert(notMarkedIndices.length > 0);
    assert(!marker.isMarked(notMarkedIndices));                 // check as array
    notMarkedIndices.map(idx => assert(!marker.isMarked(idx))); // check individually
    
    // check mixture of marked and unmarked indices across a range
    assert(marker.isMarked(0, MAX_INDEX) === undefined);
  });
  
  it("Can mark a range of indicies", function() {
    
    const REPEAT = 1000;
    const MAX_IDX = 99;    
    
    // repeat this test
    for (let i = 0; i < REPEAT; i++) {
      marker.reset();
      
      // get random start and end indices
      let rands = GenUtils.getRandomInts(0, MAX_IDX, 2);
      let start = Math.min(rands[0], rands[1]);
      let end = Math.max(rands[0], rands[1]);
      
      // mark the range
      marker.mark(start, end);
      
      // test markings
      assert(marker.isMarked(start, end));                                  // check as range
      for (let idx = start; idx < end; idx++) assert(marker.isMarked(idx)); // check individually
      
      // test other markings
      if (start > 1) assert(!marker.isMarked(0, start - 1));
      if (end < MAX_IDX) assert(!marker.isMarked(end + 1, MAX_IDX));
    }
  });
  
  it("Can unmark single indices", function() {
    
    // mark random indices 
    let indices = GenUtils.getRandomInts(0, MAX_INDEX, NUM_MARKINGS);
    marker.mark(indices);
    
    // unmark each index
    indices.map(idx => marker.unmark(idx));
    
    // test that nothing is marked
    indices.map(idx => assert(!marker.isMarked(idx)));  // check individually
    assert(!marker.isMarked(indices));                  // check as array
    assert(!marker.isMarked(0, MAX_INDEX));             // check as range 
  });
  
  it("Can unmark an array of indices", function() {
    
    // mark random indices 
    let indices = GenUtils.getRandomInts(0, MAX_INDEX, NUM_MARKINGS);
    marker.mark(indices);
    
    // unmark indices as array
    marker.unmark(indices);
    
    // test that nothing is marked
    indices.map(idx => assert(!marker.isMarked(idx)));  // check individually
    assert(!marker.isMarked(indices));                  // check as array
    assert(!marker.isMarked(0, MAX_INDEX));             // check as range 
  });
  
  it("Can unmark a range of indices", function() {
    const REPEAT = 1000;
    const MAX_IDX = 99;    
    
    // repeat this test
    for (let i = 0; i < REPEAT; i++) {
      marker.reset();
      
      // get random start and end indices
      let rands = GenUtils.getRandomInts(0, MAX_IDX, 2);
      let start = Math.min(rands[0], rands[1]);
      let end = Math.max(rands[0], rands[1]);
      
      // mark the range
      marker.mark(start, end);
      assert(marker.isMarked(start, end));
      
      // unmark the range
      marker.unmark(start, end);
      
      // turn range into indices for unmark test
      let indices = [];
      for (let idx = start; idx < end; idx++) indices.push(idx);
      
      // test no markings
      for (let idx = start; idx < end; idx++) assert(!marker.isMarked(idx));  // check individually
      assert(!marker.isMarked(indices));                                      // check indices
      assert(!marker.isMarked(start, end));                                   // check range
      assert(!marker.isMarked(0, MAX_IDX));                                   // check max range
    }
  });
  
  it("Exposes and can be built from an internal state object", function() {
    
    // mark random indices
    let indices = GenUtils.getRandomInts(0, MAX_INDEX, NUM_MARKINGS);
    marker.mark(indices);
    
    // get state
    let state = marker.getState();
    
    // build a new marker from the state
    let marker2 = new IndexMarker(state);
    assert(state === marker2.getState());  // these have the same state
    
    // the states are linked unless explicitly deep copied
    let idx = MAX_INDEX + 5;
    marker.mark(idx);
    assert(marker2.isMarked(idx));
    marker.unmark(idx);
    assert(!marker2.isMarked(idx));
  });
  
  it("Can set an internal state object", function() {
    
    // mark random indices
    let indices = GenUtils.getRandomInts(0, MAX_INDEX, NUM_MARKINGS);
    marker.mark(indices);
    
    // create new marker with different markings
    let marker2 = new IndexMarker();
    marker2.mark(GenUtils.getRandomInts(0, MAX_INDEX, NUM_MARKINGS));
    
    // overwrite the internal state
    marker2.setState(marker.getState());
    
    // ensure states are equal
    assert(marker.getState() === marker2.getState());
    assert(marker2.isMarked(indices));
  });
  
  it("Can invert marked indices", function() {
    
    // invert so all indices are theoretically marked
    marker.invert();
    assert(marker.isMarked(0, MAX_INDEX * 2));  // TODO: MAX_INDEX ^ MAX_INDEX when range compression implemented to prove performance
    
    // invert to reset
    marker.invert();
    assert(!marker.isMarked(0, MAX_INDEX * 2));
    
    // mark random indices
    let indices = GenUtils.getRandomInts(0, MAX_INDEX, NUM_MARKINGS);
    marker.mark(indices);
    
    // invert markings
    marker.invert();
    
    // check markings
    assert(!marker.isMarked(indices));      // check indices
    for (let i = 0; i < MAX_INDEX; i++) { // check individually
      assert(indices.includes(i) ? !marker.isMarked(i) : marker.isMarked(i));
    }
    assert(marker.isMarked(0, MAX_INDEX) === undefined);  // range contains marked and unmarked indices
    
    // mark some more indices
    indices = GenUtils.getRandomInts(0, MAX_INDEX, NUM_MARKINGS);
    marker.mark(indices);
    for (let idx of indices) assert(marker.isMarked(idx));
  });
  
//  it("Can get the first marked index", function() {
//    throw new Error("Not implemented");
//  });
//  
//  it("Can get the first unmarked index", function() {
//    throw new Error("Not implemented");
//  });
});