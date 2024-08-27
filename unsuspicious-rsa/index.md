# AmateursCTF 2024 - Unsuspicious RSA


I need help factoring this modulus, it looks suspicious, but I can't factor using any conventional methods.

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

n = 172391551927761576067659307357620721422739678820495774305873584621252712399496576196263035396006999836369799931266873378023097609967946749267124740589901094349829053978388042817025552765214268699484300142561454883219890142913389461801693414623922253012031301348707811702687094437054617108593289186399175149061
iter =0 
p = int(sqrt(n))
while (not isPrime(p)):
    p += 1
    iter += 1
    print(iter)

q = nextPrime(p, factorial(90))

print(q)

p = n//q

print(p)

t = nextPrime(p, factorial(90))

print(t==q)

print(p*q == n)


```

## Explanation

Finds prime factors of a large number n using high-precision arithmetic -> initializes p as the square root of n and finds the nearest prime -> finds the next prime q with a step size of 90 factorial -> calculates p and verifies p * q equals n -> checks if the next prime after p equals q.

