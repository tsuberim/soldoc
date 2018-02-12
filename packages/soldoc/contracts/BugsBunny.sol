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
