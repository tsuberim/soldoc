# SolDoc markdown theme

A simple JSON theme for SolDoc.

## Example

The following solidity code:
```Solidity
pragma solidity 0.4.19;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

/// @title A simulator for Bug Bunny, the most famous Rabbit
/// @author Warned Bros
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implement without side effects
contract BugsBunny is Ownable{
    /// @author Bob Clampett
    /// @notice Determine if Bugs will accept `(_food)` to eat
    /// @dev String comparison may be inefficient
    /// @param _food The name of a food to evaluate (English)
    /// @return true if Bugs will eat it, false otherwise
    function doesEat(string _food) external pure returns (bool) {
        return keccak256(_food) == keccak256("carrot");
    }
}
```

Produces the following output:

# BugsBunny
> A simulator for Bug Bunny, the most famous Rabbit
>
> Author: Warned Bros


**Execution cost**: less than 20502 gas

**Deployment cost**: less than 105000 gas

**Combined cost**: less than 125502 gas


## Events
### OwnershipTransferred(address,address)


**Execution cost**: No bound available


Params:

1. **previousOwner** *of type `address`*
2. **newOwner** *of type `address`*


## Methods
### doesEat(string)
>
>Determine if Bugs will accept `(_food)` to eat
>
> String comparison may be inefficient
>
> Author: Bob Clampett


**Execution cost**: No bound available

**Attributes**: constant


Params:

1. **_food** *of type `string`*

    > The name of a food to evaluate (English)


Returns:

> true if Bugs will eat it, false otherwise

1. **output_0** *of type `bool`*

---
### owner()


**Execution cost**: less than 526 gas

**Attributes**: constant



Returns:


1. **output_0** *of type `address`*

---
### transferOwnership(address)
>
> Allows the current owner to transfer control of the contract to a newOwner.


**Execution cost**: less than 22788 gas


Params:

1. **newOwner** *of type `address`*

    > The address to transfer ownership to.



[Back to the top ↑](#bugsbunny)
