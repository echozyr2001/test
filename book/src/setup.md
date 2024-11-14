# Setup

该部分将提供关于如何安装所需工具的详细步骤，帮助你快速配置 Rust 开发环境。

这些工具适用于 🐧 Linux、🍎 macOS 和 🪟 Windows 系统，我们将使用它们来编写和编译 Rust 代码。

```admonish warning
请务必在共学项目开始前完成这些安装步骤，如果在安装过程中遇到任何问题，请及时获取帮助，在共学期间我们不会解决安装相关的问题。
```

## 🛠️ 安装 Rust and Cargo

首先安装 Rust 编译器 `rustc` 及包管理器 `cargo`，通过工具 `rustup`来完成。

访问 <https://rustup.rs> 并按照页面上的提示操作，确保安装的是最新的默认工具链。安装完成后，运行以下命令来验证是否安装成功：

```bash
rustc -V && cargo -V
```

正确安装后应显示类似如下的版本信息（版本号可能有所不同）：

```bash
rustc 1.67.1 (d5a82bbd2 2023-02-07)
cargo 1.67.1 (8ecd4f20a 2023-01-10)
```

更多关于 Rust 工具链的信息请参考：
- 📖 [Rustup](https://rust-lang.github.io/rustup)
- 📦 [Cargo](https://doc.rust-lang.org/cargo) 

## ✨ 安装 Rustfmt and Clippy

Rust 提供了代码格式化工具 Rustfmt ✍️ 使代码保持整洁。此外，我们还会使用 Clippy，它是一组 [lint](https://zh.wikipedia.org/wiki/Lint) 工具，用于静态分析代码，帮助发现常见错误。Rustfmt 和 Clippy 通过 Rustup 默认安装。

要格式化项目代码，请运行：

```bash
cargo fmt
```

要使用 Clippy 分析代码，请运行以下命令：

```bash
cargo clippy
```

更多信息请参考：
- 📏 [Rustfmt](https://github.com/rust-lang/rustfmt)
- 🔍 [Clippy](https://github.com/rust-lang/rust-clippy)

## 🖥️ 推荐编辑器 Visual Studio Code

我们推荐使用 Visual Studio Code (vscode) 进行开发。当然，你也可以选择任何自己喜欢的编辑器，但如果遇到问题，我们可能无法提供帮助。

vscode 的安装说明可以在这里找到：[Visual Studio Code](https://code.visualstudio.com/)。

接下来还需要安装一些必要的插件。首先是 Rust-Analyzer，这是 Rust 开发中必不可少的工具，安装说明请参考：🛠️ [Rust-Analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)。

另外，我们还推荐安装 CodeLLDB 插件，它可以在 vscode 中调试 Rust 代码。安装说明请参考：🐞 [CodeLLDB](https://marketplace.visualstudio.com/items?itemName=vadimcn.vscode-lldb)。

下面是一些非必须，但是可以提升开发体验的插件：
- [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

更多信息请参考：
- 📚 [Rust-Analyzer](https://rust-analyzer.github.io/)

## 🌲 Git

我们将使用 Git 进行版本控制。如果你还没有安装 Git，可以参考这里的安装说明：📘 [Git Install](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)。

如果之前没有使用过 Git，GitHub 的 Git 入门指南也是很好的学习资源：📗 [GitHub Git 指南](https://docs.github.com/en/get-started/using-git/about-git)。

此外，还有关于 vscode 使用 Git 的视频教程：📺 [vscode Git 视频](https://www.youtube.com/watch?v=i_23KUAEtUM)。

更多信息请参考：
- 🎥 [Git 视频教程](https://www.youtube.com/playlist?list=PLg7s6cbtAD15G8lNyoaYDuKZSKyJrgwB-)

## 📂 共学项目代码
安装好所有工具后，你可以克隆共学项目的源代码仓库，仓库地址为：🔗 [共学代码仓库]()。

克隆仓库的详细说明请参考：[如何克隆远程仓库](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls)

### 🚀 运行测试代码

> 如果你在配置本地开发环境时遇到困难，也可以使用 Rust 官方的在线环境：<https://play.rust-lang.org>。该在线环境支持编写和运行 Rust 代码，非常适合用来快速测试代码片段，尤其是在本地环境未能正常配置时。

成功克隆项目代码后，进入项目目录并运行以下命令：

```bash
cd exercises/0-setup/setup-your-installation
cargo run
```

首次运行该命令可能需要一些时间，因为 Cargo 首次需要从注册表中获取 crate 索引。接下来会编译并运行 setup 包，如果一切顺利，你将会看到如下输出：

```bash
   Compiling intro v0.1.0 ([REDACTED]/exercises/0-setup/setup-your-installation)
    Finished dev [unoptimized + debuginfo] target(s) in 0.11s
     Running `target/debug/intro`
🦀 Hello, world! 🦀
You've successfully compiled and run your first Rust project!
```

如果 VSCode 与 Rust-Analyzer 设置正确，你还可以点击 `exercises/0-setup/setup-your-installation/src/main.rs` 文件中的 '▶️ 运行' 按钮。

如果 CodeLLDB 安装成功，你还可以点击 'Debug' 按钮启动调试功能。通过点击行号设置断点，在暂停时查看变量的值，或者在调试过程中通过左侧面板的 'Variables' 查看 'Local' 变量的值。
