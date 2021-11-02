import os
import sys
a = input("Do you want to create a desktop application y/n")
if a == "y":
    os.system("echo \"[Desktop Entry]\nName=TLang\nExec=/home/$USER/.tlang/run.sh\nTerminal=true\nType=Application\" >> /home/$USER/.local/share/applications/tlang_f.desktop")
    print("Done")
else:
    print("Exiting")
    sys.exit()