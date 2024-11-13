# Rust 基础语法

## 变量

### 不可变变量

在 Rust 中，默认情况下，变量是不可变的。
也就是说，一旦变量被赋值，就无法更改其值。这种设计有助于提高程序的安全性和可维护性，防止意外的值修改。
不可变变量的特性使得代码更具可预测性，因为程序员可以确保这些变量的值在整个作用域中不会发生改变。
这样，当你在调试代码时，可以更容易地追踪变量的值，避免因为意外修改变量而导致的 Bug。


下面的代码示例展示了这一点：

```rust
fn main() {
    let some_x = 5;
    println!("some_x = {}", some_x);
    some_x = 6; // 尝试修改变量
    println!("some_x = {}", some_x);
}
```

运行该代码时会报错，因为 `some_x` 是不可变的，无法在赋值后再次更改其值。

```bash
error[E0384]: cannot assign twice to immutable variable `some_x`
 --> src/main.rs:4:5
  |
2 |     let some_x = 5;
  |         ------ first assignment to `some_x`
3 |     println!("some_x = {}", some_x);
4 |     some_x = 6;
  |     ^^^^^^^^^^ cannot assign twice to immutable variable
  |
help: consider making this binding mutable
  |
2 |     let mut some_x = 5;
  |         +++

For more information about this error, try `rustc --explain E0384`.
error: could not compile `test-life` (bin "test-life") due to 1 previous error
```

为了使变量可变，需要使用 `mut` 关键字。

### 可变变量

使用 `mut` 关键字声明变量意味着该变量可以在其作用域内被多次修改。
这样的设计非常有用，尤其是在需要通过迭代或临时存储来改变变量状态的情况下。

```rust
fn main() {
    let mut some_x = 5;  // 使用 mut 声明可变变量
    println!("some_x = {}", some_x);
    some_x = 6;  // 修改变量的值
    println!("some_x = {}", some_x);
}
```

使用 `mut` 声明的变量可以在初始化后修改其值。这样，程序可以成功运行，并输出：

```bash
some_x = 5
some_x = 6
```

需要注意的是，虽然可变变量为我们提供了灵活性，但使用它们时需要谨慎。
因为一旦变量是可变的，就可能存在被意外修改的风险，这会增加调试的难度。
因此，在编写代码时应尽可能避免不必要的可变性。

## 常量

在 Rust 中，除了变量之外，还有常量。常量在程序运行期间是不可变的，并且必须在声明时指定其类型。
常量使用 `const` 关键字来声明，通常用于那些在整个程序生命周期内不会改变的值。

常量与不可变变量的主要区别在于，常量可以在任何作用于中声明，包括全局作用域，而且其值必须在编译时就确定下来。
常量的值不能依赖于运行时的计算，而是固定不变的，这意味着常量通常被用于定义程序中不可改变的重要数据，例如数学常数、配置参数等。

```rust
const MAX_POINTS: u32 = 100_000;
```

常量的命名通常使用全大写字母，单词之间用下划线分隔。与变量不同，常量在声明后不会被销毁，它们在程序的整个生命周期内始终有效。

## 变量遮蔽
在 Rust 中，可以声明一个与之前同名的新变量，这个过程称为“变量遮蔽 (shadowing)”。遮蔽允许你复用变量名而不必使用 `mut` 关键字。例如：

```rust
fn main() {
    let x = 5;
    let x = x + 1;  // 通过遮蔽重新绑定变量 x
    let x = x * 2;

    println!("The value of x is: {}", x);  // 输出 "The value of x is: 12"
}
```

在这个例子中，变量 `x` 被多次声明，每次都会遮蔽前一次的值。这与使用 mut 修改变量不同，因为每次遮蔽都会创建一个新的变量，可以改变类型或不可变性。例如：

```rust
fn main() {
    let spaces = "   "; // `spaces` 是字符串类型
    let spaces = spaces.len(); // `spaces` 被遮蔽为一个整数类型
    println!("Number of spaces: {}", spaces); // 输出 "Number of spaces: 3"
}
```

通过变量遮蔽，你可以使用同样的变量名绑定不同类型的值，进而提高代码的灵活性和可读性。

## 数据类型

Rust 是静态强类型语言，这意味着在编译时必须知道每个变量的类型。大多数情况数据类型可以由编译器自动推断，但在编译器无法推断类型时需要显式指定数据类型。

### 整数类型

整数类型包括有符号和无符号两种类型，长度可为 8 位、16 位、32 位、64 位、128 位或基于指针大小的 `isize` 和 `usize`。无符号整数（`u` 开头）只能存储非负值，而有符号整数（`i` 开头）可以存储正负值。

| Length        | Signed  | Unsigned |
| ------------- | ------- | -------- |
| 8 bits        | `i8`    | `u8`     |
| 16 bits       | `i16`   | `u16`    |
| 32 bits       | `i32`   | `u32`    |
| 64 bits       | `i64`   | `u64`    |
| 128 bits      | `i128`  | `u128`   |
| pointer-sized | `isize` | `usize`  |

```rust
let x: i32 = 42; // i32 是最常用的整数类型
let y: u64 = 42; // 无符号 64 位整数
let z = 1_000; // 可以使用下划线分隔提高可读性
let a = 42; // 默认 i32 类型
let b = 42u64; // 指定为 u64 类型
let c = 42_000; // 使用下划线分隔
```

### 浮点类型

浮点类型用于存储带小数的数字，包括 f32（单精度）和 f64（双精度），通常默认使用 f64，因为它比 f32 更加精确。在需要高精度计算的情况下，也更推荐使用 f64。

```rust
let x = 2.0; // f64 类型
let y: f32 = 3.14; // 指定为 f32 类型
let a = 1.0f32; // 指定为 f32 类型
```

### 布尔类型

布尔类型 `true` 或 `false` 常用于条件判断和逻辑操作，是控制流中不可或缺的组成部分。

```rust
let yes: bool = true;
let no: bool = false;
let not = !no;
let and = yes && no;
let or = yes || no;
let xor = yes ^ no;
```

### 字符类型

Rust 的字符类型长度为 4 字节，不仅可以表示 ASCII 字符，还可以表示所有的 Unicode 字符。这意味着你可以使用任何语言的字符，甚至表情符号。这在处理多语言文本时非常有用。

```rust
let heart_eyed_cat = '😻';
let letter = 'ℤ';
```

### 字符串类型

Rust 的 String 类型是 UTF-8 编码，且是堆分配的。
String 并不是以空字符结尾的，不像 C/C++ 中的字符串。
Rust 中有多种字符串类型，例如 CString、PathBuf、OsString 等。

```rust
let s1 = String::from("Hello, 🌍!");
```



## 复合类型

复合类型可以将多个值组合在一起

### 元组

元组可以包含不同类型的多个值，其长度是固定的，非常适合需要将不同类型的值组合在一起的场景。例如，函数可以通过返回元组来传递多个不同类型的值。

```rust
let tup: (i32, f64, char) = (500, 6.4, 'a');
let (x, y, z) = tup; // 解构元组
println!("The value of y is: {}", y);
println!("The second value is: {}", tup.1); // 通过索引访问元组
```

### 数组

数组的所有元素必须是相同类型，长度在编译时确定。

```rust
let arr: [i32; 3] = [1, 2, 3];
println!("The first element is: {}", arr[0]);
```

数组在栈上分配，适合存储固定大小的集合。如果需要动态大小的集合，可以使用 Vec（向量）它类似于数组但具有可变长度。

```rust
let mut vec = Vec::new();
vec.push(1);
vec.push(2);
println!("The vector contains: {:?}", vec);
```

## 控制流

控制流用于控制代码的执行顺序，包括条件判断和循环。

### 条件判断

Rust 使用 `if`、`else if` 和 `else` 关键字来进行条件判断：

```rust
fn main() {
    let number = 6;
    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}
```

条件判断表达式必须返回布尔类型，类似于其他编程语言。一个独特之处是，if 可以作为表达式使用，从而简化代码。例如：

```rust
let condition = true;
let number = if condition { 5 } else { 6 }; // 根据条件赋值
println!("The value of number is: {}", number);
```

这使得代码更加简洁，并且可以减少变量的重复声明。

### 循环

Rust 提供了三种循环方式：loop、while 和 for。

**loop：** 无限循环，通常用于那些需要一直运行，直到某个条件触发的场景，例如服务器的请求处理循环。

```rust
let mut count = 0;
loop {
    println!("count = {}", count);
    count += 1;
    if count == 5 {
        break;
    }
}
```

**while：** 在条件为 `true` 时重复执行代码，适合在不确定循环次数，但知道结束条件的情况下使用。

```rust
let mut number = 3;
while number != 0 {
    println!("{}!", number);
    number -= 1;
}
println!("LIFTOFF!!!");
```

**for：** 遍历集合中的每一个元素，通常用于遍历数组，它简洁且安全，不容易发生越界错误。

```rust
let a = [10, 20, 30, 40, 50];
for element in a.iter() {
    println!("the value is: {}", element);
}
for number in 1..4 { // `1..4` 表示从 1 到 3
    println!("{}", number);
}
```

## 函数

在 Rust 中，函数是基本的代码结构单元。函数的声明使用 `fn` 关键字，并且必须明确标注参数类型和返回值类型。

```rust
fn main() {
    let result = add(5, 3);
    println!("The result is: {}", result);
}

fn add(a: i32, b: i32) -> i32 {
    a + b // Rust 中可以省略 return 关键字，只需将返回值作为最后一个表达式
}
```

函数返回值的类型在箭头 -> 之后指定。如果函数不返回值，返回类型可以省略或标为 ()。

函数是组织代码、减少重复、提高可读性的重要工具。在函数内，最后一个表达式的值会被隐式返回，也可以显式使用 return 关键字来返回某个值。

## 作用域于所有权

Rust 中有一个非常重要的概念叫“所有权 (Ownership)”。所有权规则确保内存安全，无需[垃圾回收](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science))机制。

### 所有权规则

1. 每个值在 Rust 中都有一个所有者 (Owner)。
2. 同一时间内，值只能有一个所有者。
3. 当所有者离开作用域，值将被丢弃，内存被释放。

```rust
fn main() {
    let s = String::from("hello");  // s 进入作用域
    takes_ownership(s);  // s 的所有权转移到函数内，之后无法再使用 s

    let x = 5;  // x 进入作用域
    makes_copy(x);  // x 是基本类型，复制后仍然可以使用
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
} // some_string 离开作用域并调用 `drop`，内存被释放

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
} // some_integer 是基本类型，离开作用域不会有特殊操作
```

所有权机制的独特之处在于，它避免了数据竞争和悬垂指针问题，确保了内存安全。在 `String` 这样的复杂数据类型中，所有权的转移意味着你可以避免多次释放内存的情况。此外，Rust 还提供了“借用 (Borrowing)”的概念来克服所有权的局限性。

### 借用与引用

引用允许你在不获取所有权的情况下访问数据。引用使用 `&` 符号表示，而可变引用使用 `&mut` 表示：

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1); // 借用 s1
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len() // 使用引用，不获得所有权
}
```

通过使用引用，你可以避免所有权的转移，从而继续在主函数中使用变量。Rust 编译器会确保引用的安全性，防止[悬垂引用](https://oi-wiki.org/lang/reference/)。

可变引用允许你修改借用的变量，但在同一时间内，特定数据只能有一个可变引用或多个不可变引用，以确保数据一致性：

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
    println!("{}", s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

这种严格的规则使得 Rust 在没有垃圾回收器的情况下依然能实现内存安全。

# Exercise

在编辑器中打开 `exercises/1-foundations-of-rust/1-basic-syntax/1-basic-syntax`。此文件夹中包含许多练习，可以用于练习基本的 Rust 语法。

要开始练习，请运行以下命令：

```bash
cargo run --bin 01
```

这将尝试编译并运行 exercies 1。

要继续其他练习，只需更改练习编号。

其中一些练习包含单元测试，需要测试 `src/bin/01.rs` 请运行：

```bash
cargo test --bin 01
```

确保所有测试都通过！
