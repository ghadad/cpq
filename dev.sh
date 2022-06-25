
#!/bin/bash

#docker-compose build --no-cache 

function do_action () {
    echo action : $1 
    case $1 in 
    status) 
     docker-compose ps 
    ;;
    stop)
    echo "stop all services  :"
     docker-compose kill $(docker-compose ps --services)
    docker-compose ps 
     ;;
    restart)
    echo "restart all services :"
    docker-compose kill $2 
    docker-compose up --remove-orphans
    docker-compose ps 
    ;;
    start|up)
    echo "Start all services :"
    docker-compose start
    docker-compose ps 
     ;;
    build)
     docker-compose $1 $2
      ;;
    all)
     docker-compose kill $2
     docker-compose build $2
     docker-compose up $2
     docker-compose ps $2
     ;;

     *)
       docker-compose ps 
     ;;
     esac
}


do_action $1 
