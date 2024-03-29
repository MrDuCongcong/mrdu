#  HTTP

## 什么是http

## http的版本 

## web缓存

### 缓存的类型和网络拓扑

根据缓存的使用对象可以将缓存分为两种：私有缓存和公有缓存。

私有缓存仅供个人使用，它不需要占有很大的存储空间。大多数浏览器都会将常用的文档缓存到内存或者磁盘中。

公有缓存则是供多用户使用的共享缓存，被称为是缓存代理服务器，或者代理缓存。它可以从其本地读取缓存内容，也可以代表客户端像服务端请求。

缓存是可以设置多级的，通常可以在一条

### 缓存的处理步骤


1. 接收请求。
   
2. 解析请求。
   
   web缓存是通过HTTP请求首部来进行缓存控制的，因此在接收到请求后，首先需要对请求报文进行解析。其次，解析程序负责对首部的标准化。

3. 查找本地缓存。
   
   获取到请求的URL后，缓存使用某种快速查找算法在本地查找缓存副本。缓存副本可以被存在内存、本地磁盘或者附近的计算机中。缓存副本包含原始服务器返回的响应。 缓存副本可以关联元数据，用于记录缓存的停留时间、使用次数等信息。

   当缓存没有查找到副本时，就根据配置去请求原始服务器或父缓存服务器，或返回错误信息。

4. 新鲜度检测。
   
   即使缓存查找到了副本文件，也可能因为副本在本地停留时间过长而过期了，此时就需要像服务器进行再验证，这个验证的过程被称为新鲜度检测。

5. 创建并返回响应。
   
6. 日志。


### http的缓存机制



if-modified-since/last-modified

if-none-match/ETag

### 如何衡量缓存的性能

- 缓存命中率
- 字节命中率

## http报文

### 状态码

http状态码用户客户端了解请求处理的结果。总共被分为五类。

- 100 ~ 199 信息类状态码
- 200 ~ 299 成功状态码
- 300 ~ 399  重定向状态码
- 400 ~ 499  客户端错误状态码
- 500～599 服务端错误状态码

#### 信息类状态码（100 ~ 199）

- 100
- 101 （Switching Protocols ）， 服务器根据客户端的指定，将协议切换为update首部所列的协议。

#### 成功状态码 （200 ~ 299）

- 200 （OK ）, 请求没有问题，请求的主体部分包含了服务端所需要的资源。

#### 重定向状态码（399 ~ 399）

- 300 （Multiple Choices），客户端请求实际上指向多个资源，返回这个状态码时会带有一个资源选项列表。
- 301 （Moved Permanently ），资源被永久移动，但是响应的Location可以包含资源现在所处的URL。
- 302 （Found），资源被临时移动， 客户端应该使用Location给定的临时URL来临时定位资源，将来请求依旧使用老的URL。
- 303 （See Other），告知客户端应该使用另一个URL来访问资源，新的URL位于响应的Location首部。
- 304 （Not Modified），说明资源没有被修改，可以使用协商缓存中临时缓存的资源。
- 305 （Use Proxy），说明必须使用来访问资源，代理的URL由响应的首部给出。

#### 客户端错误状态码（400  ~ 499）

- 400 （Bad Request） ，告知客户端它发送了一个错误的请求。
- 401 （Unauthorized ），未授权，告诉客户端需要先认证，获取资源的访问权限。
- 402 （Payment Required ），这个状态码暂未使用。
- 403（Forbidden）请求被拒绝， 服务端可以在响应的主体部分说明拒绝的原因，但此状态码通常是服务端不想说明拒绝原因时使用的。
- 405（Method Not Allowed），发起的请求中带有该URL不支持的方法时，服务端返回此状态码，并且应该在响应首部的allow字段中说明该URL支持的方法。

#### 服务端错误状态码（500 ~ 599）

- 500 （Internal Server Error ），通常是服务器内部错误，无法正确的处理请求时返回此状态码。

- 501（Not Implemented ），客户端发起的请求超出服务器能力范围（比如使用了服务器不支持的请求方法）。
