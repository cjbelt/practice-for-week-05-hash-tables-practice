const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets);

    for (let i = 0; i < this.capacity; i++) {
      this.data[i] = null;
    }
  }

  hash(key) {
    // Your code here
    let integer = 0;
    const charHash = sha256(key);
    let multiplier = 0;
    const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    for (let i = 7; i >= 0; i--) {
      integer += values.indexOf(charHash[i]) * Math.pow(16, multiplier);
      multiplier++;
    }

    return integer;
}

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    // Your code here
    const keyValue = new KeyValuePair(key, value);

    if (this.data[this.hashMod(key)]) {
      throw new Error('hash collision or same key/value pair already exists!')
    } else {
      this.data[this.hashMod(key)] = keyValue;
      this.count++;
    }
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    const keyValue = new KeyValuePair(key, value);
    const index = this.hashMod(key);

    if (this.data[index]) {
      keyValue.next = this.data[index];
    }

    this.data[index] = keyValue;
    this.count++;
  }

  insert(key, value) {
    // Your code here
    const keyValue = new KeyValuePair(key, value);
    const index = this.hashMod(key);

    if (this.data[index]) {
      let currBucket = this.data[index];

      while (currBucket) {
        if (currBucket.key === key) {
          currBucket.value = value;
          return;
        }

        currBucket = currBucket.next;
      }

      keyValue.next = this.data[index];
    }

    this.data[index] = keyValue;
    this.count++;
  }
}

module.exports = HashTable;
