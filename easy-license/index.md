# easy license


Description : Crack a license for JVNE and submit it remotely to get your flag.

<!--more-->

```python
from string import *

def check_first_part(first_part):
    array = [''] * 8  # Equivalent to char array of size 8 in C#
    num = 0
    
    while num < 8:
        num2 = num & 3
        c = first_part[num]
        
        if num2 == 0:
            array[num] = chr(ord(c) - 7)
        elif num2 == 1:
            array[num] = chr(ord(c) & ord('f'))
        elif num2 == 2:
            array[num] = chr(ord(c) | ord('('))
        elif num2 == 3:
            array[num] = chr(ord(c) ^ ord('a'))
        
        array[num] = chr(ord(array[num]) + ord('\n'))  # Adding newline character
        num += 1
    
    value = ''.join(array)  # Equivalent to new string(array) in C#
    
    return value

i=0
A="AAAAAAAA"
c=16
res = []
while(i<8):
    text = "S,E{{Lw`"
    value = check_first_part(A)
    if value[i] == text[i]:
        res.append(c-1)
        c=16
        i+=1
    A = list(A)
    try:
        A[i] = chr(c)
    except:
        print("Done")
    A = "".join(A)
    c+=1

from z3 import *

def solve_second_part():
    # Create an array of 8-bit integer variables for each character in the second_part string
    second_part = [BitVec(f'second_part_{i}', 8) for i in range(8)]
    
    # Create the solver
    solver = Solver()

    # Known target string after the transformation
    target_string = "{GI&9%@/"
    
    # Create constraints for each character transformation based on the provided C# logic
    for num in range(8):
        # Calculate indices and shifts
        next_num = (num + 1) % 8
        num3 = (num // 3) * 3
        
        # Shifts and bitwise operations from the original code
        num4 = LShR(second_part[next_num], num3 - num + 3)
        num5 = (second_part[num] << (num - num3 + 2)) | num4
        
        # Apply the multiplication and modulo operation
        result = (num5 * ord('%') + num * 7) % 256
        
        # Perform final bitwise manipulations
        shifted_result = ((result << 3) | LShR(result, 1)) & 0x0F
        final_result = shifted_result | (result & 0xF0)
        
        # Add constraint that the final result for each character must match the target string
        solver.add(final_result == ord(target_string[num]))

        # Add a constraint that ensures the second_part is within ASCII range (0-127)
        solver.add(second_part[num] >= 0, second_part[num] <= 127)

    # Find and return the first solution
    if solver.check() == sat:
        model = solver.model()
        solution = [model[second_part[i]].as_long() for i in range(8)]
        return solution
    else:
        return None

# Solve for the second_part and print the first solution
solution = solve_second_part()
    
res.append(45)
res.extend(solution)
# Build a bytearray directly from the list of numbers
chars = bytearray(res)

# Check the byte representation (optional, for debugging)
print(chars)

# Now send the bytearray over the connection
from pwn import *

host = "rev.akasec.club" 
port = 7331  

# Create a connection to the server
connection = remote(host, port)

# Send the bytearray directly
connection.sendline(chars)

connection.interactive()
```

## Explanation

Code should be obvious. First part was brute forced the trad way (chad), second part was brute forced the z3 way (nerd) and then you send your result using pwntools (sigma)

