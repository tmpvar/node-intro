#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main(int argc, char *argv[])
{
  int listen_socket, client_socket, portno = 1337, n;
  char buffer[256] = "\0";
  struct sockaddr_in serv_addr, cli_addr;
  socklen_t clilen = sizeof(cli_addr);

  /*
    Step 1: Create a socket
  */
  listen_socket = socket(AF_INET, SOCK_STREAM, 0);

  bzero((char *) &serv_addr, sizeof(serv_addr));

  serv_addr.sin_family = AF_INET;
  serv_addr.sin_addr.s_addr = INADDR_ANY;
  serv_addr.sin_port = htons(portno);

  /*
    Step 2: bind the socket to a port
  */
  if (bind(listen_socket, (struct sockaddr *) &serv_addr, sizeof(serv_addr)) < 0)  {
    perror("ERROR on binding");
    exit(1);
  }

  /*
    Step 3: start listening
  */
  listen(listen_socket,5);
  printf("listening on port %d\n", portno);
  fflush(stdout);

  /*
    Step 4: wait for a connection

    Accept creates a new socket for which communication to and from the client will be established
  */
  client_socket = accept(listen_socket, (struct sockaddr *) &cli_addr, &clilen);

  /*
    Step 5: recieve data

    This particular server will wait until it recieves 255 bytes of data
  */
  printf("Reading Data:\n");
  fflush(stdout);

  while (read(client_socket,buffer,255)) {
    printf("waiting...\n");
    printf("%s", buffer);
  }

  /*
    Step 6: respond to the client

    in this case send a HTTP response, the body contains "hello world!" and a newline
  */
  write(client_socket,"HTTP/1.1 200 OK\nContent-length:13\n\nhello world!\n\0",48);
  close(client_socket);
  close(listen_socket);
  return 0;
}