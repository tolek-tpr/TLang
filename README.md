# Installing
- Linux - download and run the `install.sh` script (If you get a permission denied error first run `chmod 755 install.sh` and run the file again by using `./install.sh`)
- Windows - comming soon
# TLANG
Tlang is a copy of basic with a few new functions

# Commands (For now)
- `STRING A = ""` - Creates a variable of type string
- `INT B = ""` - Creates a variable of type integer
- `//` - Used to comment things out (Has to have a space next to it or else it will not work!)
- `INPUT A` - Listens for input and writes it to the specified variable
- `LET B = A` - Sets B to A
- `PRINT "test"` - Prints to console the word "test" (For now you can not use spaces)
- `PRINT A` - Prints variable 'A' to console
- `FUNCTION test() {}` - in development

# Running
Modify the file `prg.basx` in the `src/` directory and run the following command `ts-node index.ts` (You have to be in the src/ folder or else it will not be able to find the `prg.basx` file)