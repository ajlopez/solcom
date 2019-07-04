
contract Counter {
    uint counter;
        
    function getCounter() returns(uint) {
        return counter;
    }
    
    function increment() {
        counter = counter + 1;
    }
        
    function add(uint value) {
        counter = counter + value;
    }
}

