
contract Counter {
    uint counter;
    
    constructor() public {
    }
        
    function getCounter() public view returns(uint){
        return counter;
    }
    
    function increment() public {
        counter = counter + 1;
    }
        
    function add(uint value) public {
        counter = counter + value;
    }
}

