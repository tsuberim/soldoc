# SolDoc JSON theme

A simple JSON theme for SolDoc.

## Example

The following solidity code:
```Solidity
pragma solidity 0.4.19;


/// @title A simulator for Bug Bunny, the most famous Rabbit
/// @author Warned Bros
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implement without side effects
contract BugsBunny {
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
> Author: Warned Bros

**Execution cost**: less than 94 gas
**Deployment cost**: less than 49600 gas
**Combined cost**: less than 49694 gas

## Events


## Methods
### doesEat(string)
> A simulator for Bug Bunny, the most famous Rabbit
> Author: Warned Bros

**Execution cost**: No bound available
**Attributes**: constant

Params:

1. **_food** *of type `string`* - The name of a food to evaluate (English)

Returns:

true if Bugs will eat it, false otherwise
1. **output_0** *of type `bool`*
