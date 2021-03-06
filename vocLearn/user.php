<?php

//USER CLASS
class User{
	public $firstname = 'Visitor';
	public $lastname = '';
	public $id = 0;
	public $learntLang = 3; // Default language to learn is: Mongolian
	public $masteredLang = 2; // Default language mastered: English
	public $reverseLangMode = False; // True: the answer language is the masterd language and the question is asked in the learnt language
	
	// Constructor 
	private function __construct($firstname, $lastname, $id, $learntLang, $masteredLang, $reverseLangMode){ 
		$this->firstname = $firstname;
		$this->lastname = $lastname;
		$this->id = $id;
		$this->learntLang = $learntLang;
		$this->masteredLang = $masteredLang;
		$this->reverseLangMode = False;
	}
	
	// Destructor 
	public function __destruct(){ 
		$this->firstname = 'Visitor';
		$this->lastname = '';
		$this->id = 0;
		$this->learntLang = 3;
		$this->masteredLang = 2;
		$this->reverseLangMode = False;
	}
	
	public static function userConnection($db, $login, $pwd){
		
		
		// check credits in the database
		// Get user if authentification is fine
		$req = $db->prepare('SELECT ID, ... FROM User');
		$req->execute();
				
		// fetch user info
		
		return new User('Visitor', '', 0, 3, 2, False);
	}
	
	public static function userVisitor(){
		return new User('Visitor', "", 0, 3, 2, False);
	}
}