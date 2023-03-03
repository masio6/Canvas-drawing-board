<?php
       if($_SERVER['REQUEST_METHOD'] == 'GET'){
		if(isset($_REQUEST['n'])){                      
                $nazwapliku=$_REQUEST['n'];                       
				$ścieżka ="bibliotek/".$nazwapliku.".json";
                $dane = file_get_contents($ścieżka);
                        if(filesize($ścieżka)!= 0){
                                $dane =[$dane];
                                echo json_encode($dane);
                                exit();
                        }
						else{
                                echo '';
                                exit();
                        }       
                }           
                $pliki = scandir("bibliotek");           
		   $pliki = array_diff($pliki,array('..','.'));
                $result=[];
                foreach ($pliki as $pnazwa) {
                        array_push($result,substr($pnazwa,0,-5));
                }

                echo json_encode($result);
        }
	   if($_SERVER["REQUEST_METHOD"] == 'POST'){
                if(isset($_REQUEST['n'])){
				 $zapisano=false;
				  $nazwapliku = "bibliotek/".$_REQUEST['n'].".json";
				$input = file_get_contents('php://input');              
                $D = fopen($nazwapliku,"w");             
                while(!$zapisano){
                        if(flock($D,LOCK_EX)){                                                         
						  $zapisano=true;
						  $ABC=json_decode($input,true);
						  $input=json_encode($ABC,JSON_PRETTY_PRINT);
						  fwrite($D,$input);
                          flock($D,LOCK_UN);
                        }
						else 
						{
                          sleep(1);
                        }
                }
                fclose($D);
                }
                else{
                        throw new Error("mie podano n!!");
                }
        }
?>