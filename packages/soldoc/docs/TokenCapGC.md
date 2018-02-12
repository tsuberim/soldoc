# TokenCapGC
[see the source](https://github.com/daostack/arc/tree/master/contracts/Something.sol)
> Token Cap Global Constraint

**Execution cost**: less than 233 gas
**Deployment cost**: less than 197600 gas
**Combined cost**: less than 197833 gas

## Events


## Methods
### post(address,bytes32,bytes)
> Token Cap Global Constraint

**Execution cost**: No bound available
**Attributes**: constant

Params:

1. **param_0** *of type `address`*
2. **_paramsHash** *of type `bytes32`* - the parameters hash to check the total supply cap against.
3. **param_2** *of type `bytes`*

Returns:

bool which represents a success
1. **output_0** *of type `bool`*
--- 
### getParametersHash(address,uint256)
> Token Cap Global Constraint

**Execution cost**: less than 485 gas
**Attributes**: constant

Params:

1. **_token** *of type `address`* - the token to add to the params.
2. **_cap** *of type `uint256`* - the cap to check the total supply against.

Returns:

the calculated parameters hash
1. **output_0** *of type `bytes32`*
--- 
### pre(address,bytes32,bytes)
> Token Cap Global Constraint

**Execution cost**: No bound available
**Attributes**: constant

Params:

1. **param_0** *of type `address`*
2. **param_1** *of type `bytes32`*
3. **param_2** *of type `bytes`*

Returns:

true
1. **output_0** *of type `bool`*
--- 
### setParameters(address,uint256)
> Token Cap Global Constraint

**Execution cost**: less than 40976 gas

Params:

1. **_token** *of type `address`* - the token to add to the params.
2. **_cap** *of type `uint256`* - the cap to check the total supply against.

Returns:

the calculated parameters hash
1. **output_0** *of type `bytes32`*
--- 
### params(bytes32)
> Token Cap Global Constraint

**Execution cost**: less than 934 gas
**Attributes**: constant

Params:

1. **param_0** *of type `bytes32`*

Returns:

1. **token** *of type `address`*
2. **cap** *of type `uint256`*
--- 
### when()
> Token Cap Global Constraint

**Execution cost**: less than 325 gas
**Attributes**: constant


Returns:

CallPhase enum indication  Pre, Post or PreAndPost.
1. **output_0** *of type `uint8`*

