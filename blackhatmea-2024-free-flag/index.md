# BlackHatMEA 2024 - Free Flag


Free Free

<!--more-->

## Explanation
Let's take a look at the code :

```php
<?php

function isRateLimited($limitTime = 1) {
    $ipAddress=$_SERVER['REMOTE_ADDR'];
    $filename = sys_get_temp_dir() . "/rate_limit_" . md5($ipAddress);
    $lastRequestTime = @file_get_contents($filename);
    
    if ($lastRequestTime !== false && (time() - $lastRequestTime) < $limitTime) {
        return true;
    }

    file_put_contents($filename, time());
    return false;
}

    if(isset($_POST['file']))
    {
        if(isRateLimited())
        {
            die("Limited 1 req per second");
        }
        $file = $_POST['file'];
        if(substr(file_get_contents($file),0,5) !== "<?php" && substr(file_get_contents($file),0,5) !== "<html") 
        {
            die("catched");
        }
        else
        {
            echo file_get_contents($file);
        }
    }

?>
```

### Vulnerability 

There's an LFI vulnerability in the code :

```php
$file = $_POST['file'];
if(substr(file_get_contents($file),0,5) !== "<?php" && substr(file_get_contents($file),0,5) !== "<html") {
    die("catched");
}
else {
    echo file_get_contents($file);
}
```

our input is stored in $file, the "filter" just checks if the file starts with <?php or <html, we can manage to craft a malicious payload that would bypass the condition.

### Wrapwrap

This is a tool that generates a php://filter chain that adds a prefix and a suffix to the contents of a file.

Once you generate the chain, send a post request, I personally used CURL : 

```bash
curl -X POST -d "file=$(<chain.txt)" http://websiteorwhatever.com
```


