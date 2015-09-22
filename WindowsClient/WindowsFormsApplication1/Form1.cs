using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        bool keepMouseMoving = false;
        bool mouseMovingIsStillOngoing = false;
        public Form1()
        {

            InitializeComponent();

            this.KeyDown += OnKeyDown;
            foreach (Control control in this.Controls)
            {
                control.KeyDown += OnKeyDown;
            }

        }

        private void OnKeyDown(object sender, KeyEventArgs e)
        {
            Console.WriteLine("key down! "+ e.ToString());
           // if (e.Control)
            {
                if (e.KeyValue == (int)Keys.Escape)
                {
                    textBox1.Text = "Stopped";
                    Console.WriteLine("escape");
                    keepMouseMoving = false;
                }
            }
        }


        private void Form1_Click(object sender, EventArgs e)
        {
            if (mouseMovingIsStillOngoing == false)
            {
                MoveCursor();
            }
        }
        private async void MoveCursor()
        {
            textBox1.Text = "Started";

            Console.WriteLine("starting mouse move");
            keepMouseMoving = true;
            mouseMovingIsStillOngoing = true;
            while (keepMouseMoving)
            {
                // Set the Current cursor, move the cursor's Position,
                // and set its clipping rectangle to the form. 

                this.Cursor = new Cursor(Cursor.Current.Handle);
                Cursor.Position = new Point(Cursor.Position.X - 50, Cursor.Position.Y - 50);
                Cursor.Clip = new Rectangle(this.Location, this.Size);

                await Task.Delay(10000);
            }

            mouseMovingIsStillOngoing = false;
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
