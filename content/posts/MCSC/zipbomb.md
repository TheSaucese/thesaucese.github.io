---
weight: 1
title: "MCSC 2024 - Zipbomb"
date: 2024-02-15T16:37:00+06:00
lastmod: 2024-02-15T16:37:00+06:00
draft: false
author: "theSaucese"
authorLink: "https://thesaucese.github.io"
description: "Writeup for zipbomb challenge."

tags: ["Misc", "MCSC", "Zipbomb"]
categories: ["Writeups"]

lightgallery: true

math:
  enable: true

toc:
  enable: true
---

Writeup for Zipbomb challenge from MCSC 2024.

<!--more-->

```python
import base64
import string
import gzip
import binascii
import io
import py7zr
import os
import re


brail="⠴⠂⠆⠒⠲⠢⠖⠶⠦⠔⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵⠮⠐⠼⠫⠩⠯⠄⠷⠾⠡⠬⠠⠤⠨⠌⠱⠰⠣⠿⠜⠹⠈⠪⠳⠻⠘⠸"

strings = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_"

def contains_braille(text):
    brail = "⠴⠂⠆⠒⠲⠢⠖⠶⠦⠔⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵⠮⠐⠼⠫⠩⠯⠄⠷⠾⠡⠬⠠⠤⠨⠌⠱⠰⠣⠿⠜⠹⠈⠪⠳⠻⠘⠸"
    for char in text:
        if char in brail:
            return True
    return False

def contains_hexadecimal(text):
    return all(c in string.hexdigits for c in text)

def contains_non_printables(text):
    # Iterate over each character in the text
    for char in text:
        # Check if the character is non-printable or matches specific value like 'ÿ'
        if not char.isprintable():
            return True
    # If no non-printable characters are found, return False
    return False

def convertbraille(text):
    result = ""
    for char in text:
        result += strings[brail.index(char)]
    return result

def hex_to_string(hex_str):
    try:
        # Convert hexadecimal string to bytes
        hex_bytes = bytes.fromhex(hex_str)
        # Convert bytes to string
        return hex_bytes.decode('ascii')
    except Exception as e:
        print("Error:", e)
        return None 

def gunzip_bytes_obj(text):
    text = text.encode('latin1')
    text = gzip.GzipFile(fileobj=io.BytesIO(text), mode='rb')
    text = text.read().decode('utf-8')
    return text

def is_base32(s):
    # Define the Base32 alphabet
    s=s.upper()
    print(s)
    base32_alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    
    # Check if all characters in the string are part of the Base32 alphabet
    for char in s:
        if char not in base32_alphabet:
            if char=="=":
                return True
            return False
    
    return True

def extract_7z_with_password(archive_path, output_dir, password):
    try:
        # Open the 7z archive with the provided password
        with py7zr.SevenZipFile(archive_path, mode='r', password=password) as z:
            # Extract all files to the specified output directory
            z.extractall(path=output_dir)
        print(f"Extraction of {archive_path} successful!")
        os.chdir(output_dir)

    except Exception as e:
        print(f"Extraction of {archive_path} failed:", e)

def extract_from_directory(directory, output_dir, password):
    # Iterate through files in the directory
    for filename in os.listdir(directory):
        if filename.endswith(".7z"):  # Check if the file ends with ".7z"
            # Construct the full path to the 7z archive
            archive_path = os.path.join(directory, filename)
            # Attempt to extract the 7z archive
            extract_7z_with_password(archive_path, output_dir, password)

#while True:
i=1
while True:
    with open('crack_me', 'r',encoding='utf-8') as file:
        # Read the entire contents of the file
        text = file.read()

    with open('backup_me', 'x',encoding='utf-8') as file:
        file.write(text)
    # Now 'text' contains the contents of the file
    while  (type(text) == str):
        if contains_braille(text):
            text=convertbraille(text)
        elif contains_non_printables(text):
            text=gunzip_bytes_obj(text)     
        elif contains_hexadecimal(text):
            text = ''.join([chr(int(text[i:i+2], 16)) for i in range(0, len(text), 2)])
        else : 
            text=text.upper()
            text = base64.b32decode(text).decode('utf-8')
        print(text,end="\n\n")
        if len(text) <= len("SKOWJUHYISBWNOQMZUOQOZXZPOTVAW") :
            if contains_braille(text)==False:
                break
    text=text.upper()
    extract_from_directory('.', './'+str(i), text)
    i+=1

```

## Explanation

It's a simple automation of the decoding steps 

The logic goes : detect if it's braille hex or gunzipped, decode it, cd to the new directory,rinse and repeat.