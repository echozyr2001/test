# First Project

## 创建你的第一个 Rust 项目

要开始一个新的 Rust 项目，可以通过 Cargo 创建：

```bash
$ cargo new hello-world
```

然后进入项目目录并运行项目：

```bash
$ cd hello-world
$ cargo run
```

你将会看到类似以下的输出：

```bash
Compiling hello-world v0.1.0 (/home/teach-rs/Projects/hello-world)
Finished dev [unoptimized + debuginfo] target(s) in 0.74s
Running `target/debug/hello-world`
Hello, world!
```

## Hello, world! 程序分析

下面是一个包含斐波那契数列计算的 "Hello, world!" 示例代码：

```rust
fn main() {
    println!("Hello, world! fib(6) = {}", fib(6));
}

fn fib(n: u64) -> u64 {
    if n <= 1 {
        n
    } else {
        fib(n - 1) + fib(n - 2)
    }
}
```

运行该代码，你将得到以下输出：

```bash
Compiling hello-world v0.1.0 (/home/teach-rs/Projects/hello-world)
Finished dev [unoptimized + debuginfo] target(s) in 0.28s
Running `target/debug/hello-world`
Hello, world! fib(6) = 8
```

### 代码解释

> fn main() 是程序的入口函数。
> 
> println! 用于打印输出到标准输出。感叹号表示这是一个宏调用。
> 
> 函数调用的语法是 fib(6)，参数之间用逗号分隔。
> 
> fn 是 function 的缩写，用于声明一个函数。
> 
> fib(n: u64) -> u64 表示定义一个函数，接受一个无符号 64 位整数并返回一个同类型的值。
> 
> if-else 语句用于条件判断，条件表达式不需要括号，但代码块需要用大括号括起来。
> 
> 在 fib 函数中，Rust 的函数可以省略显式的 return 语句，当表达式是函数的最后一行时会自动返回该值。

