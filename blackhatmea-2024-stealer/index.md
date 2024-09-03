# BlackHatMEA 2024 - Stealer


We received a phishing email within which we have found this file. We believe this executable acts as some sort of credential stealer. 
Note: This is a defused real malware, consider disabling your AV.


## Explanation

The file is a .Net 32-bit executable, therefore we can use DnSpy to decompile it.

You'll find that it's a bunch of obfuscated code, so we'll use a tool called de4dot to clean our code.

Inside the code there's this interesting function that always gets called whenever the code gathers data from the victim : 

```C#
// Token: 0x06000044 RID: 68
        public static string smethod_16(string string_30, string string_31)
        {
            string text = "";
            try
            {
                DESCryptoServiceProvider descryptoServiceProvider = new DESCryptoServiceProvider();
                HashAlgorithm hashAlgorithm = new MD5CryptoServiceProvider();
                byte[] array = new byte[8];
                Array.Copy(hashAlgorithm.ComputeHash(Encoding.ASCII.GetBytes(string_31)), 0, array, 0, 8);
                descryptoServiceProvider.Key = array;
                descryptoServiceProvider.Mode = CipherMode.ECB;
                ICryptoTransform cryptoTransform = descryptoServiceProvider.CreateDecryptor();
                byte[] array2 = Convert.FromBase64String(string_30);
                text = Encoding.ASCII.GetString(cryptoTransform.TransformFinalBlock(array2, 0, array2.Length));
            }
            catch (Exception)
            {
            }
            Console.WriteLine("probably flag");
            Console.WriteLine(text);
            return text;
        }
```

I added the console lines to extract the content of text so whenever the function is called we get to see what's happening. I ran the code and got this : 

```md
7267561120:QkhGbGFnWXt0M2xlZ3I0bV9nMGVzX3chbGR9
```

QkhGbGFnWXt0M2xlZ3I0bV9nMGVzX3chbGR9 is the flag in base64.

