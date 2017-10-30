import javax.swing.*;
import javax.swing.border.*;
import javax.accessibility.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;


/**
 * SampleApplet.java is a sample Swing applet that allows users
 * to alter information.   
 *  
 *   all the images in the images directory
 *   
 * COPYRIGHT 2003 SSB TECHNOLOGIES INC.
 *
 * @author Timothy Springer
 */

public class SampleApplet extends JApplet {

 	public static final String IMAGE_DIR = "images/";
 	public static final Dimension APPLET_SIZE = new Dimension(500, 200);
	public static final Dimension PANEL_SIZE = new Dimension(475, 150);
	
    JLabel statusLabel;

	//Put any functions that need to be initialized in this function
	public void init() {

	/**
	 * Excercise
	 * Specify look and feel
	 * 
	 * Description
	 * Specify the Windows look and feel for the application.  This will
	 * enable high color contrast mode.  You can ensure high contrast mode
	 * functions effectively by activating Control Panel -> Accessibility
	 * Options -> Display -> Use High Contrast
	 * 
	 * Sample Code 
	 * 		try{
	 * 			UIManager.setLookAndFeel(
	 * 				"com.sun.java.swing.plaf.windows.WindowsLookAndFeel");
	 * 		} catch(Exception e){
	 * 			System.err.println("Error settings the look and feel");
	 * 		}
	 */

		Container contentPane = getContentPane();
	    contentPane.setLayout(new BorderLayout());
		contentPane.add(getTabbedPane());
   }

	public JTabbedPane getTabbedPane(){
		JTabbedPane tabbedPane = new JTabbedPane(JTabbedPane.TOP);
		tabbedPane.add(createFirstPanel(), "Form Example", 0);
		tabbedPane.add(createSecondPanel(), "Text Area", 1);
		tabbedPane.add(createThirdPanel(), "Tab Three", 2);
		tabbedPane.setPreferredSize(APPLET_SIZE);
		return tabbedPane;
	}

	/**
	 * This creates the first panel for the sample application
	 * The first panel contains form controls that are used throughout
	 * the application interface.  In this implementation none of the 
	 * form controls have any function
	 * 
	 * @return JPanel firstPanel
	 */
	public JPanel createFirstPanel(){
		JPanel out = new JPanel();
		out.setLayout(new BorderLayout());
		out.add(createCheckBoxPanel(), BorderLayout.CENTER);
		out.add(createButtonPanel(), BorderLayout.SOUTH);
		return out;
	}


	/**
	 * This creates the checkBox panel that contains all the check
	 * boxes found under the first tab
	 * 
	 * @return JPanel checkBoxPanel
	 */
	public JPanel createCheckBoxPanel() {

		//Utilize a grid layout pattern for the box
		JPanel checkboxPanel = new JPanel();
		checkboxPanel.setLayout(new GridLayout(3, 3));

		//Create the individual check boxes
		JCheckBox checkBoxOne = new JCheckBox("Check Box One", false);
		JCheckBox checkBoxTwo = new JCheckBox("Check Box Two", false);
		JCheckBox checkBoxThree = new JCheckBox("Check Box Three", false);
		JCheckBox checkBoxFour = new JCheckBox("Check Box One", false);

		/**
		 * Excercise
		 * Specify custom tab order
		 * 
		 * Description
		 * The check box panel in the sample applet utilizes
		 * the default tab order found in a grid check layout which allows
		 * the user to navigate active elements in order of the rows in which
		 * they occur.   Alter the focus order using the 
		 * JComponent.setNextFocusableComponent function to specify
		 * a tab order that occurs in columns.
		 * 
		 * Sample Code 
		 * checkBoxOne.setNextFocusableComponent(checkBoxThree);
		 * checkBoxThree.setNextFocusableComponent(checkBoxTwo);
		 * checkBoxTwo.setNextFocusableComponent(checkBoxFour);
		 *		 
	     */
		//Specify a custom order for the check boxes

		
		//Add the check boxes to the panel
		checkboxPanel.add(checkBoxOne);
		checkboxPanel.add(checkBoxTwo);
		checkboxPanel.add(checkBoxThree);
		checkboxPanel.add(checkBoxFour);

		/**
		 * Excercise
		 * Specify a label
		 * 
		 * Description
		 * The sample text field below does not have a label explicitly 
		 * associated with it.   Create a label element and utilize the 
		 * appropriate system call to associate it with the text field.
		 * 
		 * Sample Code 
		 * JTextField textOne = new JTextField(10);
		 * JLabel textOneLabel = new JLabel("Text Field Label");
		 * textOneLabel.setLabelFor(textOne);	
		 * JPanel textPanel = new JPanel();
		 * textPanel.setLayout(new FlowLayout());
		 * textPanel.add(textOneLabel);
		 * textPanel.add(textOne);
		 * checkboxPanel.add(textPanel);
		 * 
		 */
		
		JTextField textOne = new JTextField(10);
		JPanel textPanel = new JPanel();
		textPanel.setLayout(new FlowLayout(FlowLayout.LEFT));
		textPanel.add(textOne);
		checkboxPanel.add(textPanel);
			
		/**
		 * 
		 * Excercise
		 * Specify accessible name and description
		 * 
		 * Description
		 * Certain fields on a page cannot indicate a visual lable
		 * and require a label to be set directly on the form field
		 * itself.   Whe this occurs developers must set the value
		 * of the accessible name and description.  This is done by 
		 * getting the AccessibleContext of the element
		 * and setting values directly on the context.
		 * 
		 * Sample Code
		 * JTextField textTwo = new JTextField(10);
		 * AccessibleContext acc = textTwo.getAccessibleContext();
		 * acc.setAccessibleName("Text field no label");	
		 * acc.setAccessibleDescription("This is a text field with no label");	
		 * JPanel wrapperPanel = new JPanel();
		 * wrapperPanel.setLayout(new FlowLayout());
		 * wrapperPanel.add(textTwo);
		 * checkboxPanel.add(wrapperPanel);
		 */
		JTextField textTwo = new JTextField(10);
		JPanel wrapperPanel = new JPanel();
		wrapperPanel.setLayout(new FlowLayout(FlowLayout.LEFT));
		wrapperPanel.add(textTwo);
		checkboxPanel.add(wrapperPanel);
		
		//Set a title line border for the component
		Border border = BorderFactory.createLineBorder(Color.black);
		TitledBorder titleBorder = BorderFactory.createTitledBorder(
			border, "Checkbox Title", TitledBorder.DEFAULT_JUSTIFICATION,
			TitledBorder.TOP);
		checkboxPanel.setBorder(titleBorder);
		return checkboxPanel;
	}

	/**
	 * This creates the button panel that contains all the 
	 * buttons used to trigger actions in the first tab
	 * 
	 * @return JPanel buttonPanel
	 */
	public JPanel createButtonPanel() {
		//The top half of the panel contains four checkboxes
		//in a grid
		JPanel buttonPanel = new JPanel();
		buttonPanel.setLayout(new FlowLayout());

		buttonPanel.add(createAccessibleButton("Ok", 'o'));
		buttonPanel.add(createAccessibleButton("Cancel", 'c'));
		
		/**
			 * Excercise
			 * Alter keyboard mnemonic
			 * 
			 * Description
			 * Currently the keyboard mnemonic for the apply button in
			 * the first panel of the applet has a mnemonic that interferes
			 * with the browsers favorite menu keyboard shortcut.  Alter this 
			 * to another mnemonic that does not interfere with the keyboard 
			 * shortcut for the favorite menu.
			 * 
			 * Sample Code 
			 * 		Before: buttonPanel.add(createAccessibleButton("Apply", 'a'));
			 * 		After: buttonPanel.add(createAccessibleButton("Apply", 'p'));
			 *		 
			 */
		buttonPanel.add(createAccessibleButton("Apply", 'a'));
		return buttonPanel;
	}

	/**
	 * Create an individual button with the given
	 * mnemonic key
	 * 
	 * @return JButton button
	 */
	public JButton createAccessibleButton(String buttonText, char mnemonic){
		JButton out = new JButton(buttonText);
		out.setMnemonic(mnemonic);
		return out;
	}
	
	/**
	 * Create the second panel.  The second panel contains
	 * a sample text editing functionality
	 * 
	 * @return JPanel second panel
	 */
	public JPanel createSecondPanel(){
		JPanel out = new JPanel();
		out.setLayout(new BorderLayout());
		out.add(createImageButtonPanel(), BorderLayout.NORTH);
		out.add(createTextPanel(), BorderLayout.CENTER);
		return out;
	}

	/**
	 * Create the image panel.  The image panel contains
	 * all the image icons in the program.
	 * 
	 * @return JPanel second panel
	 */
	public JPanel createImageButtonPanel(){

		JPanel out = new JPanel();
		out.setLayout(new FlowLayout(FlowLayout.LEFT));

		//Create the various image icons
		try{
						
			ImageIcon newIcon = new ImageIcon(getImageURL("new.gif"));
			ImageIcon openIcon = new ImageIcon(getImageURL("open.gif"));
			ImageIcon saveIcon = new ImageIcon(getImageURL("save.gif"));
			ImageIcon cutIcon = new ImageIcon(getImageURL("cut.gif"));
			ImageIcon copyIcon = new ImageIcon(getImageURL("copy.gif"));
			ImageIcon pasteIcon = new ImageIcon(getImageURL("paste.gif"));
			ImageIcon aboutIcon = new ImageIcon(getImageURL("about.gif"));
			
		
			//Make the image icons into buttons
			JButton newButton = new JButton(newIcon);
			JButton openButton = new JButton(openIcon);
			JButton saveButton = new JButton(saveIcon);
			JButton cutButton = new JButton(cutIcon);
			JButton copyButton = new JButton(copyIcon);
			JButton pasteButton = new JButton(pasteIcon);
			JButton aboutButton = new JButton(aboutIcon);
		
			/**
			 * Excercise
			 * Specify textual descriptions for the images
			 * 
			 * Description
			 * Currently the image buttons used in the text tab of the application
			 * do not contain information regarding the textual values of the images.
			 * Create textual descriptions of the images using the 
			 * AccessibleContext object exported by the image icons.
			 * 
			 * Sample Code 
			 * AccessibleContext iconAC = newIcon.getAccessibleContext();   
			 * iconAC.setAccessibleName("New");
			 * iconAC.setAccessibleDescription("Create a new file");
			 * //Optionally set the tool tip to be the same as the description
			 * newButton.setToolTipText("Create a new file");
			 */
						 
			out.add(newButton);
			out.add(openButton);
			out.add(saveButton);
			out.add(cutButton);
			out.add(copyButton);
			out.add(pasteButton);
			out.add(aboutButton);
			
		} catch (MalformedURLException mue){
			mue.printStackTrace();
		}
				
		return out;
	}

	public URL getImageURL(String imageName) throws MalformedURLException{
		String imageLocation = IMAGE_DIR + imageName;
		URL createdURL = new URL(getDocumentBase(), imageLocation);
		return createdURL;
	}
	
	/**
	 * @return
	 */
	private Component createTextPanel() {
		return new JTextArea();
	}

	public JPanel createThirdPanel(){

		JPanel out = new JPanel();
		out.setLayout(new BoxLayout(out, BoxLayout.X_AXIS));

		out.add(new 
			JLabel("Information found in this label cannot" +
				" be accessed by assistive technology.\n"));
		out.add(new 
			JLabel("Developers should use text components instead.\n"));
		
		/**
		 * Excercise
		 * Utilize text component to display instructive text
		 * 
		 * Description
		 * Currently the information displayed in the third panel of
		 * the SampleApplet contains label elements that are being used
		 * to display instructive text to the user.   Remove the
		 * label elements and provide the information through 
		 * the appropriate text component.
		 * 
		 * Sample Code 
		 * 	out.removeAll();
		 * String instructions = "Information found in this label cannot" +
		 *       " be accessed by assistive technology.\n" + 
		 *     "Developers should use text components instead.\n";
		 * JTextArea instructionField = new JTextArea(instructions){
		 * 
		 *		protected void processKeyEvent(KeyEvent e){
		 *			super.processKeyEvent(e);	
		 *		} 
		 * };
		 * instructionField.setEditable(false);
		 * instructionField.setBackground(null);
		 * out.setLayout(new BorderLayout());
		 * JScrollPane scroll = new JScrollPane(instructionField);
		 * out.add(scroll);
		 */
		 
		return out;
	}

	//Called when the applet is first viewed as a page
   public void start(){


   }

	//Called when the applet is no longer viewed on the page
	public void stop(){
	
	}
 
   

    public String getAppletInfo() {
        return "Title: Sample Applet v1.0, [Today's Date]\n"
               + "Author: [Your Name] \n"
               + "[Description of the applet]";
    }
  
}

