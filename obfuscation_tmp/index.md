# 

<!DOCTYPE html>
<html>

<head>
    <title>Obfuscation.md</title>
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
    
<style>
/* https://github.com/microsoft/vscode/blob/master/extensions/markdown-language-features/media/markdown.css */
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

body {
	font-family: var(--vscode-markdown-font-family, -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", "Ubuntu", "Droid Sans", sans-serif);
	font-size: var(--vscode-markdown-font-size, 14px);
	padding: 0 26px;
	line-height: var(--vscode-markdown-line-height, 22px);
	word-wrap: break-word;
}

html,footer,header{
	font-family: var(--vscode-markdown-font-family, -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", "Ubuntu", "Droid Sans", sans-serif);
	font-size: var(--vscode-markdown-font-size, 14px);
}

#code-csp-warning {
	position: fixed;
	top: 0;
	right: 0;
	color: white;
	margin: 16px;
	text-align: center;
	font-size: 12px;
	font-family: sans-serif;
	background-color:#444444;
	cursor: pointer;
	padding: 6px;
	box-shadow: 1px 1px 1px rgba(0,0,0,.25);
}

#code-csp-warning:hover {
	text-decoration: none;
	background-color:#007acc;
	box-shadow: 2px 2px 2px rgba(0,0,0,.25);
}

body.scrollBeyondLastLine {
	margin-bottom: calc(100vh - 22px);
}

body.showEditorSelection .code-line {
	position: relative;
}

body.showEditorSelection .code-active-line:before,
body.showEditorSelection .code-line:hover:before {
	content: "";
	display: block;
	position: absolute;
	top: 0;
	left: -12px;
	height: 100%;
}

body.showEditorSelection li.code-active-line:before,
body.showEditorSelection li.code-line:hover:before {
	left: -30px;
}

.vscode-light.showEditorSelection .code-active-line:before {
	border-left: 3px solid rgba(0, 0, 0, 0.15);
}

.vscode-light.showEditorSelection .code-line:hover:before {
	border-left: 3px solid rgba(0, 0, 0, 0.40);
}

.vscode-light.showEditorSelection .code-line .code-line:hover:before {
	border-left: none;
}

.vscode-dark.showEditorSelection .code-active-line:before {
	border-left: 3px solid rgba(255, 255, 255, 0.4);
}

.vscode-dark.showEditorSelection .code-line:hover:before {
	border-left: 3px solid rgba(255, 255, 255, 0.60);
}

.vscode-dark.showEditorSelection .code-line .code-line:hover:before {
	border-left: none;
}

.vscode-high-contrast.showEditorSelection .code-active-line:before {
	border-left: 3px solid rgba(255, 160, 0, 0.7);
}

.vscode-high-contrast.showEditorSelection .code-line:hover:before {
	border-left: 3px solid rgba(255, 160, 0, 1);
}

.vscode-high-contrast.showEditorSelection .code-line .code-line:hover:before {
	border-left: none;
}

img {
	max-width: 100%;
	max-height: 100%;
}

a {
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

a:focus,
input:focus,
select:focus,
textarea:focus {
	outline: 1px solid -webkit-focus-ring-color;
	outline-offset: -1px;
}

hr {
	border: 0;
	height: 2px;
	border-bottom: 2px solid;
}

h1 {
	padding-bottom: 0.3em;
	line-height: 1.2;
	border-bottom-width: 1px;
	border-bottom-style: solid;
}

h1, h2, h3 {
	font-weight: normal;
}

table {
	border-collapse: collapse;
}

table > thead > tr > th {
	text-align: left;
	border-bottom: 1px solid;
}

table > thead > tr > th,
table > thead > tr > td,
table > tbody > tr > th,
table > tbody > tr > td {
	padding: 5px 10px;
}

table > tbody > tr + tr > td {
	border-top: 1px solid;
}

blockquote {
	margin: 0 7px 0 5px;
	padding: 0 16px 0 10px;
	border-left-width: 5px;
	border-left-style: solid;
}

code {
	font-family: Menlo, Monaco, Consolas, "Droid Sans Mono", "Courier New", monospace, "Droid Sans Fallback";
	font-size: 1em;
	line-height: 1.357em;
}

body.wordWrap pre {
	white-space: pre-wrap;
}

pre:not(.hljs),
pre.hljs code > div {
	padding: 16px;
	border-radius: 3px;
	overflow: auto;
}

pre code {
	color: var(--vscode-editor-foreground);
	tab-size: 4;
}

/** Theming */

.vscode-light pre {
	background-color: rgba(220, 220, 220, 0.4);
}

.vscode-dark pre {
	background-color: rgba(10, 10, 10, 0.4);
}

.vscode-high-contrast pre {
	background-color: rgb(0, 0, 0);
}

.vscode-high-contrast h1 {
	border-color: rgb(0, 0, 0);
}

.vscode-light table > thead > tr > th {
	border-color: rgba(0, 0, 0, 0.69);
}

.vscode-dark table > thead > tr > th {
	border-color: rgba(255, 255, 255, 0.69);
}

.vscode-light h1,
.vscode-light hr,
.vscode-light table > tbody > tr + tr > td {
	border-color: rgba(0, 0, 0, 0.18);
}

.vscode-dark h1,
.vscode-dark hr,
.vscode-dark table > tbody > tr + tr > td {
	border-color: rgba(255, 255, 255, 0.18);
}

</style>

<style>
/* Tomorrow Theme */
/* http://jmblog.github.com/color-themes-for-google-code-highlightjs */
/* Original theme - https://github.com/chriskempson/tomorrow-theme */

/* Tomorrow Comment */
.hljs-comment,
.hljs-quote {
	color: #8e908c;
}

/* Tomorrow Red */
.hljs-variable,
.hljs-template-variable,
.hljs-tag,
.hljs-name,
.hljs-selector-id,
.hljs-selector-class,
.hljs-regexp,
.hljs-deletion {
	color: #c82829;
}

/* Tomorrow Orange */
.hljs-number,
.hljs-built_in,
.hljs-builtin-name,
.hljs-literal,
.hljs-type,
.hljs-params,
.hljs-meta,
.hljs-link {
	color: #f5871f;
}

/* Tomorrow Yellow */
.hljs-attribute {
	color: #eab700;
}

/* Tomorrow Green */
.hljs-string,
.hljs-symbol,
.hljs-bullet,
.hljs-addition {
	color: #718c00;
}

/* Tomorrow Blue */
.hljs-title,
.hljs-section {
	color: #4271ae;
}

/* Tomorrow Purple */
.hljs-keyword,
.hljs-selector-tag {
	color: #8959a8;
}

.hljs {
	display: block;
	overflow-x: auto;
	color: #4d4d4c;
	padding: 0.5em;
}

.hljs-emphasis {
	font-style: italic;
}

.hljs-strong {
	font-weight: bold;
}
</style>

<style>
/*
 * Custom MD PDF CSS
 */
html,footer,header{
	font-family: -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", "Ubuntu", "Droid Sans", sans-serif, "Meiryo";

 }
body {
	font-family: -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", "Ubuntu", "Droid Sans", sans-serif, "Meiryo";
	padding: 0 12px;
}

pre {
	background-color: #f8f8f8;
	border: 1px solid #cccccc;
	border-radius: 3px;
	overflow-x: auto;
	white-space: pre-wrap;
	overflow-wrap: break-word;
}

pre:not(.hljs) {
	padding: 23px;
	line-height: 19px;
}

blockquote {
	background: rgba(127, 127, 127, 0.1);
	border-color: rgba(0, 122, 204, 0.5);
}

.emoji {
	height: 1.4em;
}

code {
	font-size: 14px;
	line-height: 19px;
}

/* for inline code */
:not(pre):not(.hljs) > code {
	color: #C9AE75; /* Change the old color so it seems less like an error */
	font-size: inherit;
}

/* Page Break : use <div class="page"/> to insert page break
-------------------------------------------------------- */
.page {
	page-break-after: always;
}

</style>
<link rel="stylesheet" href="file:///r%3A/2.Travail/1.Enseignement/Cours/_1.Outils/2.Developpement/1.SCSS/main.css" type="text/css"><link rel="stylesheet" href="file:///d%3A/rdaros/Cours/_1.Outils/2.Developpement/1.SCSS/main.css" type="text/css">
</head>

<body>
    <p>The goal of this challenge is to reverse this highly obfuscated binary and get the correct passphrase</p>
<h2 id="explanation">Explanation</h2>
<p>The program asks for a passphrase, because of that and the name of the program I assumed there would some passphrase obfuscated, so I decompiled it :</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-2.png" alt="alt text"></p>
<p>Couldn't understand anything so I checked if maybe it was packed ?</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-1.png" alt="alt text"></p>
<p>Nope, okay we'll let's use BinaryNinja then :</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-12.png" alt="alt text"></p>
<p>93A3 is our function, so let's set a breakpoint at the start of it and see what happens to our input :</p>
<p>Before :</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-4.png" alt="alt text"></p>
<p>After :</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-5.png" alt="alt text"></p>
<p>Interesting, looks like there's a mapping function, I sent another input just to make sure and it's probably the case :</p>
<p>Before :</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-6.png" alt="alt text"></p>
<p>After :</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-7.png" alt="alt text"></p>
<p>But then I got stuck</p>
<p>So I tried strace and saw this :</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-8.png" alt="alt text"></p>
<p>I needed to find where this happens, so I went back and checked if rand gets called</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-10.png" alt="alt text"></p>
<p>Let's put a breakpoint on rand and spam continue until I find which function calls it</p>
<p>and there it is : at 818e6</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-14.png" alt="alt text"></p>
<p>now we'll see what happens with this rand call</p>
<p>after spamming it after 34 times we finally stop calling rand, this probably means that the flag is 34 characters long.</p>
<p>What I did was make rand always return 0 and see what happens.</p>
<p>After trial and error, I found this line that compares our result with the expected result :</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-13.png" alt="alt text"></p>
<p>&quot;0xcd&quot; is our input since A turns to 0xcd and we are comparing it with 0xa5</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-15.png" alt="alt text"></p>
<p>so there's probably a xor with the LSB of the rand value, let's try setting back to generating random values.</p>
<p>let's input &quot;a&quot; :</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-17.png" alt="alt text"></p>
<p>Then I wondered : how can I solve this challenge if the values are random each time yet the compared value is always the same ? so I wrote &quot;a&quot; again :</p>
<p><img src="file:///e:/HostileNinja72.github.io-main/blog/TheSaucese/content/posts/CSAW/image-17.png" alt="alt text"></p>
<p>Same result. So it looks like I'll have to resort to the old reliable : guessing one character at a time.</p>
<p>After hours I finally found it :</p>
<p><code>wh47 15 7h3 r1ck 457l3y p4r4d0x?</code></p>
<p>Fun.</p>

</body>

</html>
