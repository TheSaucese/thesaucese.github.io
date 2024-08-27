# AmateursCTF 2024 - Less suspicious RSA


I need help factoring this modulus, it looks less suspicious, but I can't factor using any conventional methods.

<!--more-->

```python
from math import sqrt
from decimal import *
from Crypto.Util.number import *
import gmpy2
from gmpy2 import mpz, is_prime
getcontext().prec = 100  # Change the precision

def factorial(n):
    if n == 0:
        return 1
    return factorial(n-1) * n

def nextPrime(p, n):
    p += (n - p) % n
    p += 1
    iters = 0
    while not isPrime(p):
        p += n
    return p

n = 138963980427736364646203557164328211078134463518489686365728312873583832517087170768576679472472907142081360480944201759920246566585465801088226164314480607014663211599932950864391702460227584467326051919881067028851940610382044445003060103566003934601979805899293539507221062915314813557293919231917284247667
iter =0 
p = int(sqrt(n))
while (not isPrime(p)):
    p += 1
    iter += 1
    #print(iter)

q = n//p
print(q)
print(p)

n = p*q
print(n)

```

## Explanation

Computes square root of n -> finds the nearest prime p greater than or equal to the square root -> calculates q as n divided by p -> verifies by recomputing n as p * q.

