import time
import tkinter
from tkinter import simpledialog
from tkinter import messagebox
root=tkinter.Tk()
root.withdraw()

o=simpledialog.askstring(title=None,prompt="repeater_in: ")
time.sleep(1)
d=simpledialog.askstring(title=None,prompt="do you know what you tiped?: ")
if d==o:
    messagebox.showinfo(title=None,message="yes you tiped: " + str(o))
else:
    messagebox.showerror(title=None, message="no you tiped:  " + str(o) + "  not:  " + str(d))

root.destroy()